class User:
    def __init__(self, fname, lname, email, password,role):
        self.fname = fname
        self.lname=lname
        self.email = email
        self.password = password
        self.role=role

    def register(self):
        pass  

    def login(self):
        pass  

    def update_details(self, new_details):
        if 'fname' in new_details:
            self.fname = new_details['fname']
        if 'lname' in new_details:
            self.lname = new_details['lname']
        if 'email' in new_details:
            self.email = new_details['email']
        if 'password' in new_details:
            self.password = new_details['password']

class Student(User):
    def __init__(self, fname, lname, email, password, major):
        super().__init__(fname, lname, email, password,"Student")
        self.major = major
        self.enrolled_courses = []

    def get_enrolled_courses(self):
        return self.enrolled_courses

    def enroll_course(self, course):
        self.enrolled_courses.append(course)

    def drop_course(self, course):
        self.enrolled_courses.remove(course)

    def update_details(self, new_details):
        # Overloaded update method for student-specific details
        super().update_details(new_details)  # Call the parent class update method
        if 'major' in new_details:
            self.major = new_details['major']

class TA(User):
    def __init__(self, fname,lname, email, password, courses_list, office_hours):
        super().__init__(fname, lname, email, password,"Student")
        self.courses_list = courses_list
        self.office_hours = office_hours

    def assist_in_course(self, course):
        self.courses_list.append(course)

    def schedule_office_hours(self, hours):
        self.office_hours = hours

class Instructor(User):
    def __init__(self, fname,lname, email, password, department):
        super().__init__(fname, lname, email, password,"Instructor")
        self.department = department
        self.courses_taught = []

    def teach_course(self, course):
        self.courses_taught.append(course)

    def view_students(self, course):
        return course.view_enrolled_students()
    



