FROM node:20.10.0
RUN mkdir -p /app
WORKDIR /app
COPY ./todo_web_vue .
EXPOSE 8082
RUN chmod -Rf 777 /app
CMD ["./start.sh"]
