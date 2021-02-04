FROM node:12
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./


# If you are building your code for production
# RUN npm ci --only=production

COPY . /app
ENV LD_LIBRARY_PATH=/app/utils/instantclient_18_5_linux/instantclient_18_5:/app/utils/linux_libs:/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH

RUN npm install \
&& cd /app/utils/ \
&& unzip instantclient-basic-linux.x64-18.5.0.0.0dbru.zip -d instantclient_18_5_linux \
&& rm instantclient-basic-linux.x64-18.5.0.0.0dbru.zip 
#&& cp /app/utils/linux_lib/libaio.so.1.0.1 /lib/x86_64-linux-gnu/ \
#&& ln -s /lib/x86_64-linux-gnu/libaio.so.1.0.1 /lib/x8664-linux-gnu/libaio.so.1 \
#&& ldconfig

CMD ["npm", "run", "express-start"]