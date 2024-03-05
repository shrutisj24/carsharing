from flask import Flask, flash, session, redirect, url_for
from flask import render_template,request,send_file
from werkzeug.utils import secure_filename
import googlemaps
import os
import pymysql
import threading
lock = threading.Lock()

def dbConnection():
    try:
        connection = pymysql.connect(host="localhost", user="root", password="root", database="ridesharing")
        return connection
    except:
        print("Something went wrong in database Connection")

def dbClose():
    try:
        dbConnection().close()
    except:
        print("Something went wrong in Close DB Connection")

con = dbConnection()
cursor = con.cursor()

app = Flask(__name__)

app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['UPLOAD_FOLDER1'] = 'static/identityPhoto/'
app.config['UPLOAD_FOLDER2'] = 'static/documents/'

################################################        SESSION         ###############################################################################
@app.route('/driverSession',methods=['POST','GET'])
def driverSession():
    if(request.method=='POST'):       
        uname = request.form['name']
        session['drivername'] = uname
        print(uname)
        return uname

@app.route('/userSession',methods=['POST','GET'])
def userSession():  
    if(request.method=='POST'):       
        uname = request.form['name']
        session['username'] = uname
        print(uname)
        return uname

#######################################################################################
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/userRegister')
def userRegister(): 
    return render_template("userRegister.html")

@app.route('/driverRegister')
def driverRegister():
    return render_template("driverRegister.html")

@app.route('/login')
def login():
    return render_template("login.html")
############################################        DRIVER    ###########################################################################################
@app.route('/driverhome')
def driverhome():
    username = session['drivername']
    return render_template("driverhome.html",username=username)

@app.route('/driverProfile')
def driverProfile():
    username = session['drivername']
    return render_template("driverProfile.html",username=username)
#############################################		DRIVER PROFILE FORM      #########################################################################
@app.route('/uploadProfile', methods=['POST', 'GET'])
def uploadProfile():
    if request.method=='POST':
        uname = session['drivername']
        fullname=request.form['fullname']
        dob= request.form['dob']
        gender= request.form['gender']
        image= request.files['file']
        address = request.form['address']
        state= request.form['state']
        email= request.form['email']
        mobile= request.form['mobile']
        licenceNo = request.form['licence']
        date= request.form['date']
        proof= request.files['file1']
        model= request.form['model']
        year= request.form['year']
        vin= request.form['vin']
        types="driverlist"
        
        filename_secure = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER1'], filename_secure))
        filenamepath = os.path.join(app.config['UPLOAD_FOLDER1'],filename_secure)
        print(filenamepath)
        
        filename_secure = secure_filename(proof.filename)
        proof.save(os.path.join(app.config['UPLOAD_FOLDER2'], filename_secure))
        filenamepath1 = os.path.join(app.config['UPLOAD_FOLDER2'],filename_secure)
        print(filenamepath1)
        
        identity = fullname+"|"+dob+"|"+gender+"|"+filenamepath
        contactinfo =address+"|"+state+"|"+email+"|"+mobile
        licenceinfo =str(licenceNo)+"|"+str(date)+"|"+filenamepath1
        vehicleinfo =model+"|"+year+"|"+vin
        ListOfFile = {'a':identity,'b':contactinfo,'c':licenceinfo,'d':vehicleinfo,'e':uname,'f':types}
        return ListOfFile
 #########################################################################################################3   
@app.route('/displayDriver',methods=['POST','GET'])
def displayDriver():
    if request.method == "POST":
        details = request.form
        data = details['data']
        data1=data.split('|')
    return render_template("displayDriver.html",data1=data1)

@app.route('/sendDataForRide',methods=['POST','GET'])
def sendDataForRide():
    if request.method == "POST":
        details = request.form
        data = details['data']
        data1=data.split('|')        
        uname = session['drivername']
    return render_template("startRide.html",data1=data1,uname=uname)

def get_distance(api_key, origin, destination, mode='driving'):
    gmaps = googlemaps.Client(key=api_key)
    directions_result = gmaps.directions(origin, destination, mode=mode)
    distance_meters = directions_result[0]['legs'][0]['distance']['value']
    distance_kilometers = distance_meters / 1000
    return distance_kilometers

def calculate_fare(distance, rate_per_kilometer):
    fare = distance * rate_per_kilometer
    return fare

api_key = 'AIzaSyDwaXa3JZsFqv71812tm1k5FokRzLrX0RM'

@app.route('/calculateFare',methods=['POST','GET'])
def calculateFare():
    if request.method == "POST":
        details = request.form
        origin = details['source']  
        destination = details['destination']  
        
        rate_per_kilometer = 8 
        distance = get_distance(api_key, origin, destination)
        fare = calculate_fare(distance, rate_per_kilometer)
        
        return str(round(fare))

############################################        USER      ###############################################################
@app.route('/userhome')
def userhome():
    username = session['username']
    return render_template("userhome.html",username=username)

@app.route('/driverList')
def driverList():
    username = session['username']
    return render_template("driverList.html",username=username)

@app.route('/bookRide')
def bookRide():
    username = session['username']    
    return render_template("bookRide.html",username=username)

@app.route('/viewStatus')
def viewStatus():
    username = session['username']    
    return render_template("viewStatus.html",username=username)

@app.route('/driverList1')
def driverList1():
    username = session['drivername']
    return render_template("driverList1.html",username=username)

@app.route('/viewRequests')
def viewRequests():
    user = session['drivername']
    return render_template("viewRequests.html",username=user)

@app.route('/contact')
def contact():
    return render_template("contact.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/logout')
def logout():
    return render_template("login.html")

@app.route('/mapSource',methods=['POST','GET'])
def mapSource():
    if request.method == "POST":
        details = request.form
        loc = details['data'].split('|')
        source = loc[0]
        destination = loc[1]
        return render_template('map.html',source=source,destination=destination) 
    
  
import stripe

public_key = "pk_test_6pRNASCoBOKtIshFeQd4XMUh"
stripe.api_key = "sk_test_BQokikJOvBiI2HlWgH4olfQ2"\
    
@app.route('/PaymentMode',methods=['POST','GET'])
def PaymentMode():
    if request.method == "POST":
        details = request.form        
        ridedata = details['data']
        data=ridedata.split('|') 
        
        print(data)       
        
        session['rideamount'] = data
        
        cursor.execute('SELECT * FROM ridepayment WHERE username = %s AND rider = %s AND ride = %s', (data[8],data[12],data[4]+"|"+data[5]))
        count = cursor.rowcount
        if count > 0:     
            flash('Payment already done for this ride!', 'success')
            return redirect(url_for('viewStatus'))
        else:        
            return render_template('razor_payment.html',data=data, public_key=public_key,amount=str(int(float(data[7]))*100)) 


@app.route('/payment2', methods=['POST'])
def payment2():
    customer = stripe.Customer.create(email=request.form['stripeEmail'],
                                      source=request.form['stripeToken'])

    data = session['rideamount']
    charge = stripe.Charge.create(
        customer=customer.id,
        amount=str(int(float(data[7]))),
        currency='USD',
        description='Donation')
    
    print(charge.balance_transaction)    

    sql1 = "INSERT INTO ridepayment(username, rider, ride, amount, transactionid) VALUES (%s, %s, %s, %s, %s);"
    val1 = (data[8],data[12],data[4]+"|"+data[5], data[7], charge.balance_transaction)
    cursor.execute(sql1,val1)
    con.commit()

    flash('Payment done Successfully!', 'success')     
    return redirect(url_for('viewStatus'))
        

if __name__ == "__main__":
    app.run("0.0.0.0")
    # app.run(debug=True)
