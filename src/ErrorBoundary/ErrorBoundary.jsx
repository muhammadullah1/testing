import { message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

class ErrorBoundary extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
  }

  render() {
    if (this.state.hasError) {
      message.error("error");
        // return this.props.children
      // You can render any custom fallback UI
    //   window.history.go(-1)
    
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
