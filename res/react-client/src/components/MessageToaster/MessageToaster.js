import React, { PropTypes } from 'react';
import { removeMessage, selectMessages, Level } from 'redux/modules/Messages';
import { connect } from 'react-redux';
import { Alert, Button } from 'react-bootstrap';
import FadeIn from 'utils/animations/FadeIn';

class MessageToaster extends React.Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    removeMessage: PropTypes.func.isRequired,
  };

  constructor (props) {
    super(props);
    this.removeMessage = this.removeMessage.bind(this);
  }

  removeMessage (messageKey) {
    return () => this.props.removeMessage(messageKey);
  }

  render () {
    const bsStyleByLevel = {
      [Level.Error]: 'danger',
      [Level.Warning]: 'warning',
      [Level.Info]: 'info',
      [Level.Success]: 'success',
    };

    const style = {
      width: '300px',
      padding: '20px',
      margin: '10px 0 10px -150px',
      textAlign: 'center',
      display: 'block',
    };

    return (
      <div style={{
        position: 'fixed',
        left: '50%',
        zIndex: 10000,
        marginTop: '60px',  /* leave space for the app bar */
      }}>
        <FadeIn>
          {this.props.messages && this.props.messages.map((message, idx) => {
            return (
              <Alert
                bsStyle={bsStyleByLevel[message.level]}
                style={style}
                key={message.key}
              >
                <Button bsSize="xsmall" onClick={this.removeMessage(message.key)}>
                  ×
                </Button>
                {message.message}
              </Alert>
            );
          })}
        </FadeIn>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      messages: selectMessages(state),
    };
  },
  {
    removeMessage: removeMessage
  }
)(MessageToaster);
