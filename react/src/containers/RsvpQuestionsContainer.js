import React from 'react';
import { connect } from 'react-redux';
import RsvpAttendeeQuestionManager from '../components/RsvpAttendeeQuestionManager';
import NotAttending from '../components/rsvpQuestions/NotAttending';

const RsvpQuestionsContainer = (props) => {
  let additionalQuestions;
  if( props.attending === "Yes" ){
    additionalQuestions = (
      <RsvpAttendeeQuestionManager
        formError        ={ props.formError }
        plusOne          ={ props.plusOne }
        eventHasFood     ={ props.eventHasFood }
        foodChoice       ={ props.foodChoice }
        plusOneAttending ={ props.plusOneAttending }
      />
    )
  } else if( props.attending === "No" ){
    additionalQuestions = <NotAttending />
  }

  return(<div>{ additionalQuestions }</div>)
}

let mapStateToProps = (store) => {
  let formValues = { rsvp: false };
  if(store.form.emailConfirmation.values != undefined){
    formValues.rsvp             = store.form.emailConfirmation.values.rsvp
    formValues.error            = store.form.emailConfirmation.error
    formValues.plusOneAttending = store.form.emailConfirmation.values.plusOneAttending
    formValues.foodChoice       = store.form.emailConfirmation.values.foodChoice
  }

  return {
    attending:        formValues.rsvp,
    formError:        formValues.error,
    plusOneAttending: formValues.plusOneAttending,
    foodChoice:       formValues.foodChoice,
    plusOne:          store.emailConfirmation.guest.plusOneInvited,
    eventHasFood:     store.emailConfirmation.event.foodOptions,
  }
}

export default connect(
  mapStateToProps, {}
)(RsvpQuestionsContainer)