# react-sound-detection

A React component for sound detection.

## Installation

You can install `react-sound-detection` using npm:

```bash
npm install react-sound-detection
```

## Usage

To use `react-sound-detection` in your React application, simply import the `AudioDetector` component and include it in your JSX:

```jsx
import React from 'react';
import AudioDetector from 'react-sound-detection';

function App() {
  const handleSoundDetected = () => {
    console.log("Sound detected!");
    // Do something when sound is detected
  };

  return (
    <div>
      <h1>Voice Recorder</h1>
      <AudioDetector
        minDecibels={-45}
        onSoundDetected={handleSoundDetected}
        autostart={true}
      />
    </div>
  );
}

export default App;
```

## Props

- `minDecibels`: (optional) Minimum decibel level for sound detection. Default is `-45`.
- `onSoundDetected`: (optional) Callback function called when sound is detected.
- `autostart`: (optional) Boolean indicating whether sound detection should start automatically. Default is `false`.
