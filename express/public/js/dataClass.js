class Event {
  constructor(name, details, start, end) {
    this.name = name;
    this.details = details;
    this.start = start;
    this.end = end;
  }
}

class News {
  constructor(name, content, author, date) {
    this.name = name;
    this.content = content;
    this.author = author;
    this.date = date;
  }
}

class Comment {
  constructor(time, comment) {
    this.time = time;
    this.comment = comment;
  }
}

export { Event, News, Comment };
