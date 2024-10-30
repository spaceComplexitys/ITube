# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Install ffmpeg in the container
RUN apt-get update && apt-get install -y ffmpeg

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy app source inside the docker image
COPY . .

# Make port 3000 available outside this container
EXPOSE 3000

# Define the command to run your app using CMD (only one CMD allowed)
CMD [ "npm", "start" ]

# local
# docker build --platform linux/amd64 -t video-processing-service .

# set up gcloud
# gcloud auth login # Copy the output url and paste it into your browser

# gcloud config set project it-clone

# This is for the docker in google cloud
# step 1
# docker buildx build --platform linux/amd64 -t us-central1-docker.pkg.dev/it-clone/video-processing-repo/video-processing-service .
# step 2
# docker push us-central1-docker.pkg.dev/it-clone/video-processing-repo/video-processing-service
# step 3
# gcloud run deploy video-processing-service --image us-central1-docker.pkg.dev/it-clone/video-processing-repo/video-processing-service \
#   --region=us-central1 \
#   --platform managed \
#   --timeout=3600 \
#   --memory=2Gi \
#   --cpu=1 \
#   --min-instances=0 \
#   --max-instances=1 \
#   --ingress=internal


# step 1 Create raw videos bucket

#gsutil mb -l us-central1 --pap=enforced gs://david-yt-raw-videoss
#gsutil mb -l us-central1 --pap=enforced gs://david-yt-processed-videos

# step 2  Configure bucket to send file upload notifications to Pub/Sub topic

# gsutil notification create -t video-uploads-topic -f json -e OBJECT_FINALIZE gs://nc-yt-raw-videoss
