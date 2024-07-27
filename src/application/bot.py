import discord
import os
from discord.ext import commands
import firebase_admin
from firebase_admin import credentials, firestore

cred_path = os.path.join(os.path.dirname(__file__), 'config/serviceAccountKey.json')
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)
db = firestore.client()

intents = discord.Intents.default()
intents.messages = True
intents.guilds = True
intents.message_content = True

bot = commands.Bot(command_prefix='.', intents=intents)

@bot.command(name='tasks')
async def list_tasks(ctx):
    user_id = str(ctx.author.id)
    user_name = ctx.author.name
    tasks_ref = db.collection('tasks').where('userName', '==', user_name)
    tasks = tasks_ref.stream()
    task_list = [task.to_dict().get('task', 'Unnamed tasks') for task in tasks]
    if task_list:
        embed = discord.Embed(title=f'{ctx.author.name}´s tasks', description=f'\n'.join(task_list), color=0x56c852)
        view = discord.ui.View()
        botao_url_manager = discord.ui.Button(label="Manage your tasks", url='https://vhnb.vercel.app/')
        view.add_item(botao_url_manager)
        await ctx.send(embed=embed, view=view)
    else:
        embed = discord.Embed(title=f'{ctx.author.name}, you do not have any tasks registered!', color=0xe6e349)
        view = discord.ui.View()
        botao_url = discord.ui.Button(label="Add a task now", url='https://vhnb.vercel.app/')
        botao_url_portfolio = discord.ui.Button(label='Meet the owner', url='https://vhnb.vercel.app/')
        view.add_item(botao_url)
        view.add_item(botao_url_portfolio)
        await ctx.send(embed=embed, view=view)

@bot.event
async def on_ready():
    await bot.change_presence(activity=discord.Game("Your easy tasks"))
    print("On")

bot.run('MTI2NTg4MjI3ODIxOTg3NDMwNA.G8ZpiX.qAIQGnIHtjmH6W1TRaZpk3zoyCVVGXVBr1HeFU')