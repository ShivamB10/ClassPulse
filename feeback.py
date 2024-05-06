class Feedback:
    def __init__(self, feedback_id, course_id, content, date_submitted):
        self.feedback_id = feedback_id
        self.course_id = course_id
        self.content = content
        self.date_submitted = date_submitted

    def submit_feedback(self):
        pass  

    def view_feedback(self):
        pass  

    def edit_feedback(self, new_content):
        self.content = new_content
