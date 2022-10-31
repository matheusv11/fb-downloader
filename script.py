import requests 
import re
import urllib.parse
import sys

email = 'xenofabio22@gmail.com'
password = 'ikarin123'

print("Email: "+email)
print("Pass:  "+password)

session = requests.session()
session.headers.update({
  'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:39.0) Gecko/20100101 Firefox/39.0'
})
response = session.get('https://m.facebook.com')
response = session.post('https://m.facebook.com/login.php', data={
  'email': email,
  'pass': password
}, allow_redirects=False)
print(response.cookies)

if 'c_user' in response.cookies:
    # login was successful
    homepage_resp = session.get('https://m.facebook.com/home.php')
    fb_dtsg = re.search('name="fb_dtsg" value="(.+?)"', homepage_resp.text).group(1)
    user_id = response.cookies['c_user']
    
    video_url = sys.argv[-3]
    print("Video url:  "+video_url)
    video_id = re.search('videos/(.+?)/', video_url).group(1)

    video_page = session.get(video_url)
    identifier = re.search('ref=tahoe","(.+?)"', video_page.text).group(1)
    final_url = "https://www.facebook.com/video/tahoe/async/{0}/?chain=true&isvideo=true&originalmediaid={0}&playerorigin=permalink&playersuborigin=tahoe&ispermalink=true&numcopyrightmatchedvideoplayedconsecutively=0&storyidentifier={1}&dpr=2".format(video_id,identifier)
    
    data = {'__user': user_id,
            '__a': '',
            '__dyn': '',
            '__req': '',
            '__be': '',
            '__pc': '',
            '__rev': '',
            'fb_dtsg': fb_dtsg,
            'jazoest': '',
            '__spin_r': '',
            '__spin_b': '',
            '__spin_t': '',
    }
    api_call = session.post(final_url, data=data)
    try:
        final_video_url = re.search('hd_src":"(.+?)",', api_call.text).group(1)
    except AttributeError:
        final_video_url = re.search('sd_src":"(.+?)"', api_call.text).group(1)

print(final_video_url.replace('\\',''))