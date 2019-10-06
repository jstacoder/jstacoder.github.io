import os
import sys
import datetime
from inflection import parameterize

def slugify(name):
    return parameterize(name)

def create_post_folder(post_name):
    slug = slugify(post_name)
    date = datetime.datetime.now().strftime('%Y-%m-%d')
    folder = os.path.join('content','posts','{}-{}'.format(date, slug))
    os.makedirs(folder, exist_ok=True)
    return folder


def create_index_mdx(post_name, folder):
    content = '''---
 name: {}
 layout: default
---

    '''.format(post_name)

    with open(os.path.join(folder, 'index.mdx'), 'w') as f:
        f.write(content)

if __name__ == "__main__":
    post_name = sys.argv[-1]
    print('creating post {}'.format(post_name))
    post_folder = create_post_folder(post_name)
    print('made folder {}'.format(post_folder))
    create_index_mdx(post_name, post_folder)

