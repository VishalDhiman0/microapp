import React from "react";

const CommentList = ({ comments }) => {

  const renderedComments = comments.map((comment) => {
    let content;
    switch(comment.status) {
      case 'accepted': {
        content = comment.content;
        break;
      };
      case 'pending': {
        content = 'Comment is yet to be moderated.';
        break;
      };
      case 'rejected': {
        content = 'Comment has been rejected.';
        break;
      };
      default: {}
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
