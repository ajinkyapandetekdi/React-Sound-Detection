import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AudioDetector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soundDetected: false,
      isDetecting: false, // Added state to track if sound detection is in progress
    };
  }

  componentDidMount() {
    // Start sound detection automatically if autostart is enabled
    if (this.props.autostart) {
      this.startSoundDetection();
    }
  }

  componentWillUnmount() {
    this.stopSoundDetection();
  }

  startSoundDetection = async () => {
    try {
      const { minDecibels } = this.props;

      // Prevent multiple instances of sound detection running simultaneously
      if (this.state.isDetecting) return;

      this.setState({ isDetecting: true });

      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const audioContext = new AudioContext();
        const audioStreamSource = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.minDecibels = minDecibels || Number(-45);
        audioStreamSource.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        const domainData = new Uint8Array(bufferLength);

        const detectSound = () => {
          if (this.state.soundDetected) {
            return;
          }

          analyser.getByteFrequencyData(domainData);

          for (let i = 0; i < bufferLength; i++) {
            if (domainData[i] > 0) {
              this.setState({ soundDetected: true });
              // Call the callback function passed as props
              if (this.props.onSoundDetected) {
                this.props.onSoundDetected();
              }
              break;
            }
          }

          window.requestAnimationFrame(detectSound);
        };

        window.requestAnimationFrame(detectSound);
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  stopSoundDetection = () => {
    // Add any cleanup logic here if needed
    this.setState({ isDetecting: false });
  };

  handleStartButtonClick = () => {
    this.startSoundDetection();
  };

  render() {
    return null;
  }
}

// Prop types for AudioDetector component
AudioDetector.propTypes = {
  minDecibels: PropTypes.number,
  onSoundDetected: PropTypes.func,
  autostart: PropTypes.bool,
};
