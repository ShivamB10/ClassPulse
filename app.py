import os
from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.view import view_config
import pandas as pd
import pickle
import pipeline
from users import User, TA, Instructor
from pyramid.httpexceptions import HTTPFound,HTTPUnauthorized
from pyramid.session import SignedCookieSessionFactory
from course import Course
from feeback import Feedback
import json
course_id_map={
'OOD':'CIS 675',
'DAA': 'CIS 600',
'DBMS': 'CIS 700'

}
def my_encoder(obj):
    # Function to help json.dumps() recognize custom objects
    if hasattr(obj, 'to_json'):
        return obj.to_json()
    return obj.__dict__  # Fallback if to_json is not defined


user_data = pd.DataFrame(columns=['fname', 'lname', 'email', 'password', 'role'])
course_registrations = pd.DataFrame(columns=['user_email', 'course_id', 'course_title','course_semester'])
feedback_data = pd.DataFrame(columns=['email', 'course_id', 'feedback'])

@view_config(route_name='viewfeedback', renderer='template/viewfeedback.pt')
def viewfeedback_page(request):
    user = request.session.get('user', None)
    if user:
        user=json.loads(user)
        instructor_email=user["email"]
        global course_registrations
        courses_titles=course_registrations[course_registrations["user_email"]==instructor_email]["course_title"].to_list()
        courses_ids=course_registrations[course_registrations["user_email"]==instructor_email]["course_id"].to_list()
        print(courses_titles)
        print(courses_ids)

    global feedback_data
    feedbacks = feedback_data[feedback_data["course_id"].isin(courses_ids)]['feedback'].tolist()
    print(feedbacks)
    ids = feedback_data[feedback_data["course_id"].isin(courses_ids)]['course_id'].tolist()
    results = []
    for i in range(len(feedbacks)):
        df = pd.DataFrame([feedbacks[i]], columns=["text"])
        prediction = SA.model_inference(model, df)
        results.append({"id":ids[i],"feedback": feedbacks[i],"sentiment_score": prediction[0] ,"analysis": "Positive" if prediction[0] else "Negative"})
        print(results)
    return {"results": results}

@view_config(route_name='givefeedback', renderer='template/givefeedback.pt')
def givefeedback_page(request):
    if(request.method=='POST'):
        
        user = request.session.get('user', None)
        if user:
            user=json.loads(user)
            print(user)
            user_email=user["email"]

        else:
            user_email='NA'
        course_id = request.params.get('course')
        feedback_text = request.params.get('feedbackText')

        # Save feedback to a global DataFrame or database
        global feedback_data  # DataFrame to be defined in global scope
        feedback_record = pd.DataFrame({'email': [user_email], 'course_id': [course_id], 'feedback': [feedback_text]})
        feedback_data = pd.concat([feedback_data,feedback_record])
        print(feedback_data)

        return HTTPFound(location=request.route_url('home'))  # Redirect after submission
    else:
        return {}

@view_config(route_name='registercourse', renderer='template/register_course.pt')
def register_course(request):
    if request.method == 'POST':
        # Extract course details from the form submission
        course_semester = request.params.get('selectedSemester')
        course_title = request.params.get('selectedCourse')
        course_id=course_id_map[course_title]
        user = request.session.get('user', None)
        if user:
            user=json.loads(user)
            print(user)
            user_email=user["email"]
        else:
            user_email='NA'

        # # Create a new Course instance
        new_course = Course(course_id, course_title,'CIS','3',course_semester)

        # # Add the course registration to the DataFrame
        # global course_registrations
        new_record = {
            'user_email': [user_email],
            'course_id': [new_course.course_id],
            'course_title': [new_course.title],
            'course_semester':[new_course.semester]
        }
        course_record= pd.DataFrame(new_record)
        global course_registrations
        course_registrations=pd.concat([course_registrations, course_record])
        print(course_registrations)

        # Redirect to a confirmation page or back to the course list
        return HTTPFound(location=request.route_url('home'))  # Redirect user to home or another appropriate page
    else:
        # If not a POST request, just render the form page or handle accordingly
        return {}

@view_config(route_name='home', renderer='template/home.pt')
def home_page(request):
    user = request.session.get('user', None)
    if user:
        user=json.loads(user)
        print(user)
        user_role=user["role"]
    else:
        user_role='Guest'

    return {'user_role': user_role}

@view_config(route_name='register', renderer='template/register.pt')
def register_page(request):
    if request.method == 'POST':
        # Extract form data
        first_name = request.params.get('fname')
        last_name = request.params.get('lname')
        role=request.params.get('selectedValue')
        email=request.params.get('email')
        passw=request.params.get('pass')
        new_user_obj = User(first_name,last_name,email,passw,role)
        # TA, INST, STUDENT different objects--> Inheritance
        global user_data
        new_user = pd.DataFrame({'fname': [new_user_obj.fname],'lname':[new_user_obj.lname], 'email': [new_user_obj.email], 'password': [new_user_obj.password],'role':[new_user_obj.role]})
        user_data = pd.concat([user_data, new_user])
        print(user_data)
        request.session['user'] = json.dumps(new_user_obj, default=my_encoder)

        return  HTTPFound(location=request.route_url('login'))
    else:
        return {}

@view_config(route_name='login', renderer='template/login.pt')
def login_page(request):
    # user = request.session.get('user', None)
    if request.method == 'POST':
        # Extract the email and password from POST request
        email = request.params.get('email')
        password = request.params.get('pass')  

        # Authenticate against the DataFrame
        user_record = user_data[(user_data['email'] == email) & (user_data['password'] == password)]

        if not user_record.empty:
            user_record=user_record.to_dict(orient='records')[0]
            print(user_record)
            new_user_obj=User(user_record["fname"],user_record["lname"],user_record["email"],user_record["password"],user_record["role"])
            request.session['user'] = json.dumps(new_user_obj, default=my_encoder)
            return HTTPFound(location=request.route_url('home'))
        else:
            # Failed login, render the login page again with an error message
            return {'error_message': 'Incorrect username or password'}

    # For GET requests, just return the normal page rendering if any
    return {'error_message': None} 

@view_config(route_name='hello')
def hello_world(request):
    return Response("Server is Up and running")

@view_config(route_name="check", renderer="json", request_method="POST", openapi=True)
def check(request):
    text = request.params['text']
    df = pd.DataFrame([text], columns=["text"])
    pred = SA.model_inference(model, df)
    return {"Prediction": "Positive Sentiment" if pred[0] else "Negative Sentiment"}

if __name__ == "__main__":
    model = pickle.load(open("Model/MultinomialNB.pkl", "rb"))
    SA = pipeline.Sentiment_Analysis(test=True)
    my_session_factory = SignedCookieSessionFactory('itsaseekreet')

    with Configurator() as config:
        config.set_session_factory(my_session_factory)
        config.include("pyramid_openapi3")
        config.include("pyramid_chameleon")
        config.pyramid_openapi3_spec("docs/apidocs.yaml")
        config.add_static_view(name='static', path='static')
        config.pyramid_openapi3_add_explorer()
        config.add_route("check", "/check")
        config.add_route("hello", "/")
        config.add_route('login', '/login')
        config.add_route('home', '/home')
        config.add_route('register', '/register')
        config.add_route('registercourse', '/registercourse')
        config.add_route('viewfeedback', '/viewfeedback')
        config.add_route('givefeedback', '/givefeedback')
        config.scan()
        app = config.make_wsgi_app()
    print("Server started at http://localhost:5001")
    server = make_server("0.0.0.0", 5001, app)
    server.serve_forever()
