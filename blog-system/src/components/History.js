import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import "../styles/History.css";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedContent: null,
    };
  }

  groupHistoryByDate = (historyItems) => {
    const groups = {
      today: [],
      yesterday: [],
      older: [],
    };

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = (date) => date.toDateString() === today.toDateString();
    const isYesterday = (date) =>
      date.toDateString() === yesterday.toDateString();

    historyItems.forEach((item) => {
      const itemDate = new Date(item.created_at);
      if (isToday(itemDate)) {
        groups.today.push(item);
      } else if (isYesterday(itemDate)) {
        groups.yesterday.push(item);
      } else {
        groups.older.push(item);
      }
    });

    return groups;
  };

  handleHistoryClick = (item) => {
    this.setState({ selectedContent: item.generated_content });
    if (this.props.onHistoryItemClick) {
      this.props.onHistoryItemClick(item.generated_content);
    }
  };

  renderHistoryGroup = (items, title) => {
    if (items.length === 0) return null;

    return (
      <div className="history-group">
        <h6 className="history-group-title">{title}</h6>
        <ListGroup>
          {items.map((item) => (
            <ListGroup.Item
              key={item.id}
              className="history-item"
              onClick={() => this.handleHistoryClick(item)}
              style={{ cursor: "pointer" }}
            >
              <div className="history-item-content">
                <div className="search-section">
                  <span className="search-content">
                    {item.keywords || item.sentence}
                  </span>
                </div>
                <span className="timestamp">
                  {new Date(item.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  };

  render() {
    const groupedHistory = this.groupHistoryByDate(this.props.history);

    return (
      <div className="history-wrapper">
        <div className="system-header">
          <div className="system-header-content">
            <img
              src="/logo.png"
              alt="BlogSystem AI Logo"
              className="system-logo"
            />
            <span className="system-title">BlogSystem AI</span>
          </div>
        </div>
        <div className="history-container">
          <div className="recent-searches-header">Recent Searches</div>
          {this.renderHistoryGroup(groupedHistory.today, "Today")}
          {this.renderHistoryGroup(groupedHistory.yesterday, "Yesterday")}
          {this.renderHistoryGroup(groupedHistory.older, "Older")}
        </div>
      </div>
    );
  }
}

export default History;
