#Localhosted Tetris

##Requirements :

###You need to install Flask in order to get this program run, try this if you don't know whether flask is installed or not :

- Go into your command prompt
- Enter this command : pip show flask

If it gives you an error then you do not have Flask installed on your computer

#Follow this steps if it is not already installed :

Type :

- cd "the path you want to install Flask into"
- pip install flask

#Enter these commands in your command prompt :

- Set-ExecutionPolicy -ExecutionPolicy AllSigned -Scope CurrentUser (it allows your system to execute any program in your command prompt)
- pip install -U flask-cors (it permits to deal with de CORS issues easily by using the command "CORS(app)")

##Get the program working :

You need first to create a virtual environment :

Type this in your command prompt :

- cd "the path where flask is installed"
- env\Scripts\activate

Then run the program !
  
- flask --app app run
