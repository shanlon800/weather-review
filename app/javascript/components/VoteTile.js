import React, { Component } from 'react';
// try moving the fetch in componentDidMount into a separate function that can be called when evaluating currentUser's votes
class VoteTile extends Component {
  constructor(props){
    super(props)
    this.state = {
      upvotes: 0,
      downvotes: 0,
      userVoted: null
    }
    this.voteHandler = this.voteHandler.bind(this);
    this.voteProcessing = this.voteProcessing.bind(this);
  }

  componentDidMount(){
    fetch(`/api/v1/cities/${this.props.cityId}/reviews/${this.props.reviewId}/votes`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`;
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let voteData = body;

      let upvotes = 0;
      let downvotes = 0;
      let userVoted = null;
      let currentUser = this.props.currentUser;

      if (voteData.length > 0) {
        voteData.forEach(function(vote) {
          if (vote.vote == 1) {
            upvotes += vote.vote
          } else if (vote.vote == -1) {
            downvotes += vote.vote
          }
          if (currentUser != null) {
            if (vote.user_id == currentUser) {
              userVoted = vote;
              if (vote.vote == 1) {
                userVoted.dir = 'up';
              } else if (vote.vote == -1) {
                userVoted.dir = 'down';
              }
            }
          }
        })

      }
      this.setState({
        upvotes: upvotes,
        downvotes: downvotes,
        userVoted: userVoted
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  voteProcessing(method, value){
    console.log(`A ${method} vote of ${value} was submitted to review ${this.props.reviewId}.`);
    let votePayload = {
      user_id: this.props.currentUser,
      review_id: this.props.reviewId,
      vote: value
    }
    if (method == 'POST') {
      fetch('/api/v1/votes', {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(votePayload),
        headers: { 'Content-Type': 'application/json' }
      }).then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`;
          error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        let newVote = body;
        newVote.dir = "up"
        if (newVote.vote == 1) {
          this.setState({
            upvotes: this.state.upvotes + newVote.vote,
            userVoted: newVote
          })
        } else if (body.vote == -1) {

        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  voteHandler(e){
    let VALUES = {
      "u": 1,
      "d": -1
    }

    if (this.props.currentUser != null) {
      let voteValue = VALUES[`${e.target.className[0]}`];

      if (this.state.userVoted != null) {
        if (e.target.className.includes(this.state.userVoted.dir)) {
          this.voteProcessing("update", 0);
        } else {
          this.voteProcessing("update", voteValue);
        }
      } else {
        this.voteProcessing("POST", voteValue);
      }
    } else {
      console.log("Please log in before voting on a review.");
    }
  }

  render(){
    let totalVotes = this.state.upvotes + this.state.downvotes;
    let upvoteClass = 'u fa fa-chevron-up';
    let downvoteClass = 'd fa fa-chevron-down';

    if (this.props.currentUser != null) {
      let voteData = this.state.userVoted;
      if (voteData != null) {
        let voteDirection = voteData.dir;
        if (voteDirection == 'up') {
          upvoteClass = upvoteClass + ' vote-selected';
        } else if (voteDirection == 'down') {
          downvoteClass = downvoteClass + ' vote-selected';
        }
      }
    }

    return(
      <span className='votes'>
        <span className='upvote'><i className={upvoteClass} onClick={this.voteHandler}></i></span>
        <div>{totalVotes}</div>
        <span className='downvote'><i className={downvoteClass} onClick={this.voteHandler}></i></span>
      </span>
    )
  }
}

export default VoteTile;
