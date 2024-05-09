from flask import Blueprint, render_template
from flask import Flask,request
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

main_bp = Blueprint('main', __name__, template_folder='templates', static_folder='static')

app = Flask(__name__, static_folder='static')
@main_bp.route('/')
def index():
    items = [
        {'cabID': '222', 'shijian': '122d', 'final_result': '222', 'info': '22', 'image_path': 'path_to_image1'},
        {'cabID': '223', 'shijian': '123d', 'final_result': '223', 'info': '23', 'image_path': 'path_to_image2'},
        # 可以添加更多的字典项
    ]

    return render_template('main/notepad.html', items =items )

@main_bp.route('/feedback')
def feedback():
    return render_template('main/feedback.html')

@main_bp.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    msg = "";
    if request.method == 'POST':
        email = request.form.get('email')
        feedback = request.form.get('feedback')

        # 发送邮件
        send_email(email, feedback)
    return render_template('main/notepad.html')

def send_email(email, feedback):
    # 设置发件人和收件人
    sender_email = 'gd830218001@gmail.com'
    receiver_email = 'jinguangdong_949@naver.com'
    feedback = email+"    \n" + feedback

    # 创建邮件对象
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = 'Feedback'


    # 设置邮件正文
    body = f'Feedback from: {email}\n\n{feedback}'
    msg.attach(MIMEText(body, 'plain'))

    print(sender_email)
    print(receiver_email)
    print(feedback)

    # 使用 SMTP 发送邮件
    with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
        smtp.starttls()
        smtp.login(sender_email, 'xqgv xjzh ezwu lsax')
        smtp.send_message(msg)

