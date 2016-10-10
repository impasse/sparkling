require 'rack/post-body-to-params'
require 'sinatra/base'
require 'sequel'
require 'http'
require 'json/ext'

$page_size = 8

module Blog
    DB = Sequel.connect('mysql2://root:ivanc21@127.0.0.1/typecho')
    Sequel::Model.instance_eval{ plugin :json_serializer }
    

    class User < Sequel.Model(:typecho_users)
        one_to_many :contents, :key=>:authorId
    end

    class Meta < Sequel.Model(:typecho_metas)
        many_to_many :contents, :join_table=>:typecho_relationships, :left_key=>:mid, :right_key=>:cid

        def render
        	{name:name,slug:slug,description:description,count:count,type:type}
        end
    end

    class Content < Sequel.Model(:typecho_contents)
        many_to_one :user, :key=>:authorId, class:User
        many_to_many :metas, :join_table=>:typecho_relationships, :left_key=>:cid, :right_key=>:mid

        def short
        	(text || '').split('<!--more-->').first
        end

        def render(s = true)
        	{ cid:cid,title:title,slug:slug,created:created,modified:modified,text:s ? short : text,metas:metas.map(&:render) }
        end
    end


    class API < Sinatra::Base
        use Rack::PostBodyToParams
        configure do
        	set :server, 'puma'
            set :bind, '127.0.0.1'
            add_charset << 'application/json'
        end

        before do
            content_type :json
        end

        get '/api/v1/page/:slug' do |slug|
        	c = Content.where(type:'page',slug:slug).first
            c.to_json(only:[:cid,:title,:slug,:text]) unless c.nil?
        end

        get '/api/v1/posts/:page' do |page|
			{
				size: $page_size,
				count: Content.where(type:'post').count,
				data: Content.where(type:'post',status:'publish').order(Sequel.desc(:created)).offset(page.to_i*$page_size).limit($page_size).map(&:render)
			}.to_json
        end

        get '/api/v1/post/:query' do |query|
            c = Content.where(slug:query).or(cid:query.to_i).first
            c.render(false).to_json unless c.nil?
        end

        get '/api/v1/option' do
        	{ links:[ {name:'Vue',href:'http://vuejs.org'} ], metas:Meta.all, pages:Content.where(type:'page',status:'publish').select(:title,:slug) }.to_json
        end

        post '/api/v1/search' do
        	type = params['type']
        	query = params['query']
            return halt 400 if type.nil? or query.nil?
        	case type
        		when 'tag','category'
        			m = Meta.where(type:type,slug:query).first
                    m.contents.select{|post|post.type=='post'}.to_json unless m.nil?
        		else
        			Content.where(type:'post').filter(Sequel.ilike(:title,"%#{query}%")).map(&:render).to_json
        	end
        end

        options '/api/v1/search' do
            headers 'Allow'=>'GET,POST','Access-Control-Allow-Headers'=>'X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept'
            200
        end

        not_found do
            content_type :html
            '404 Not Found'
        end
    end

end

Blog::API.run!
