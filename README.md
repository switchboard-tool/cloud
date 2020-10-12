Architecture notes

1. During build time, request environments file from Github and we put its last modified timestamp the output html (with posthtml expression)
2. During run time, client checks the timestamp on the html to determine whether to make a request to the API
3. When the environments file in Github is modified, we trigger a netlify build to update the timestamp in the output html
