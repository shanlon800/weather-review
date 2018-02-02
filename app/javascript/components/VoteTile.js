import React, { Component } from 'react';

class VoteTile extends Component {
  constructor(props){
    super(props)
    this.state = {
      upvotes: 0,
      downvotes: 0,
      userVoted: null
    }
    this.voteHandler = this.voteHandler.bind(this);
    this.voteDigester = this.voteDigester.bind(this);
    this.newvoteDigester = this.newvoteDigester.bind(this);
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
      let votesData = body;
      let upvotes = 0;
      let downvotes = 0;
      let userVoted = null;
      let currentUser = this.props.currentUser;

      if (votesData.length > 0) {
        votesData.forEach(function(vote) {
          if (vote.vote == 1) {
            upvotes += vote.vote
          } else if (vote.vote == -1) {
            downvotes += vote.vote
          }

          if (currentUser != null) {
            if (vote.user_id == currentUser) {
              userVoted = vote;
              if (vote.vote == 1) {
                userVoted.dir = 'u';
              } else if (vote.vote == -1) {
                userVoted.dir = 'd';
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

  voteHandler(e){
    let VALUES = {
      "u": 1,
      "d": -1
    }

    if (this.props.currentUser != null) {
      let voteValue = VALUES[`${e.target.className[14]}`];
      if (this.state.userVoted != null) {
        if (e.target.className.includes(this.state.userVoted.dir)) {
          this.voteDigester("remove", 0);
        } else {
          this.voteDigester("update", voteValue);
        }
      } else {
        this.voteDigester("new", voteValue);
      }
    } else {
      console.log("Please log in before voting on a review.");
    }
  }

  voteDigester(method, value){
    let voteData;
    let estApi;
    let fetchMethod;

    let votePayload = {
      user_id: this.props.currentUser,
      review_id: this.props.reviewId,
      vote: value
    }

    switch (method) {
      case "new":
        estApi = '';
        fetchMethod = 'POST';
        break;
      case "update":
        estApi = `/${this.state.userVoted.id}`;
        fetchMethod = 'PATCH'
        break;
      case "remove":
        estApi = `/${this.state.userVoted.id}`;
        fetchMethod = 'DELETE';
        break;
      default:
        console.log(`Something went wrong in the voteDigester with ${votePayload}. You may need to check the vote method.`);
    }

    fetch(`/api/v1/votes${estApi}`, {
      credentials: 'same-origin',
      method: `${fetchMethod}`,
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
      voteData = this.newvoteDigester(body);
      this.setState({
        upvotes: voteData.uv,
        downvotes: voteData.dv,
        userVoted: voteData.returnedVote
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  newvoteDigester(voteData){
    let currentUpvotes = this.state.upvotes;
    let currentDownvotes = this.state.downvotes;
    let vote = voteData;
    let oldVote = 0;

    if (voteData.new) { vote = voteData.new; }
    if (voteData.old) { oldVote = voteData.old; }
    switch (vote.vote) {
      case 1:
        vote.dir = "u";
        currentUpvotes += vote.vote - oldVote;
        break;
      case -1:
        vote.dir = "d";
        currentDownvotes += vote.vote - oldVote;
        break;
      case 0:
        vote = null;
        if (oldVote == 1) {
          currentUpvotes -= oldVote;
        } else if (oldVote == -1) {
          currentDownvotes -= oldVote;
        }
        break;
    }

    let statePayload = {
      uv: currentUpvotes,
      dv: currentDownvotes,
      returnedVote: vote
    };

    return statePayload;
  }

  render(){
    let totalVotes = this.state.upvotes + this.state.downvotes;
    let uvClass = 'fa fa-chevron-up';
    let dvClass = 'fa fa-chevron-down';

    if (this.props.currentUser != null) {
      let voteData = this.state.userVoted;
      if (voteData != null) {
        let voteDirection = voteData.dir;
        if (voteDirection == uvClass[14]) {
          uvClass = uvClass + ' uvselect';
        } else if (voteDirection == dvClass[14]) {
          dvClass = dvClass + ' dvselect';
        }
      }
    }

    return(
      <span className='votes'>
        <span className='upvote'><i className={uvClass} onClick={this.voteHandler}></i></span>
        <div>{totalVotes}</div>
        <span className='downvote'><i className={dvClass} onClick={this.voteHandler}></i></span>
      </span>
    )
  }
}

export default VoteTile;
