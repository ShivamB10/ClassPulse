class Course:
    def __init__(self, course_id, title, department, credits,semester):
        self.course_id = course_id
        self.title = title
        self.department = department
        self.credits = credits
        self.semester=semester
        self.enrolled_students = []

    def view_enrolled_students(self):
        return self.enrolled_students

    def update_course_details(self, details):
        pass  

    def enroll_student(self, student):
        self.enrolled_students.append(student)

    def drop_student(self, student):
        if student in self.enrolled_students:
            self.enrolled_students.remove(student)

class Enroll:
    def __init__(self, enrollment_id, student, course):
        self.enrollment_id = enrollment_id
        self.student = student
        self.course = course

    def enroll_student(self):
        self.course.enroll_student(self.student)

    def drop_student(self):
        self.course.drop_student(self.student)

    def verify_enrollment(self):
        return self.student in self.course.enrolled_students

