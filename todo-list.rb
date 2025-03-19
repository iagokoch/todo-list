require 'sinatra'
require 'sinatra/activerecord'


set :database, {adapter: 'sqlite3', database: 'todo-list.sqlite3'}

class Task < ActiveRecord::Base
  validates :title, presence: true
end


#config da pagina inicial
get '/' do
  @task = Task.all.order(created_at: :desc)
  erb :index
end

#form para novas tarefas
get '/tasks/new' do 
  task = Task.new
  erb :new
end

#nova tarefa
post '/task' do 
  @task = Task.new(title: params[:title], description: params[:description])
  if @task.save
    redirect '/'
  else
    erb :new
  end
end

#para vizualizar uma certa tarefa
get '/task/:id' do
  @task = Task.find(params[:id])
  erb :show
end

#form para editar tarefa
get '/task/:id/edit' do
  @task = Task.find(params[:id])
  erb :edit
end

#atualiza uma tarefa
put '/task/:id' do
  @task = Task.find(params[:id])
  if @task.update(title: params[:title], description: params[:description], completed: params[:completed] ? true : false)
    redirect '/'
  else
    erb :edit
  end
end

#remove tarefa
delete '/task/:id' do
  @task = Task.find(params[:id])
  @task.destroy
  redirect '/'
end