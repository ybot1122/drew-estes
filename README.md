## how to add an article:
1. src/articlemetadata.json
2. add corresponding directory to public/images/articles
3. produce a raw html version of the article
4. run it through jsonparser and save the .json structure
5. upload .json to corresponding s3 bucket

## adding a mini-article:
mostly the same steps as above but there's some weird routing hacks that might need to be understood
 