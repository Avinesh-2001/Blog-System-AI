import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import History from './History';
import { blogService } from '../services/api';
import '../styles/Dashboard.css';

// Content Formatter Component

const ContentFormatter = ({ content }) => { 
  const formatContent = (text) => {
    // First, let's handle the initial "Generated Content:" header if it exists
    let parts = text.split('**Generated Content:**');
    let mainContent = parts.length > 1 ? parts[1] : text;

    // Split the remaining content by double asterisks
    const contentParts = mainContent.split('**');
    
    return (
      <div className="text-justify">
        {contentParts.map((part, index) => {
          if (index % 2 === 1) {
            if (part.startsWith('*')) {
              // Remove the asterisk and add bullet point
              const cleanText = part.substring(1).trim();
              return (
                <div key={index} className="d-flex align-items-start mb-2">
                  <span className="me-2">•</span>
                  <span className="fw-bold">{cleanText}</span>
                </div>
              );
            }
            // Regular bold text
            return <span key={index} className="fw-bold">{part}</span>;
          }
          // Regular text
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="formatted-content p-3">
      {formatContent(content)}
    </div>
  );
};

const Dashboard = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchType, setSearchType] = useState('keywords');
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    fetchHistory();
  }, []);

  const generateContent = async (input) => {
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCrugYr_xzvVJnjt6v2CPiDmg3GZlp07zA",
        method: "post",
        data: {
          contents: [{ parts: [{ text: input }] }],
        },
      });
      
      const content = response.data.candidates[0].content.parts[0];
      setGeneratedContent(content.text);
      
      return content;
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const content = await generateContent(searchInput);
      console.log('Generated content:', content); // Debug log
      setGeneratedContent(content.text);
  
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        throw new Error('User not found');
      }
  
      // Create payload
      const payload = {
        userId: user.id,
        keywords: searchType === 'keywords' ? searchInput : '',
        sentence: searchType === 'sentence' ? searchInput : '',
        generatedContent: content.text // Make sure this matches your backend expectation
      };
  
      console.log('Sending payload:', payload); // Debug log
  
      await blogService.create(payload);
      setSearchInput('');
      await fetchHistory();
    } catch (error) {
      console.error('Error handling submission:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryItemClick = (content) => {
    setGeneratedContent(content);
  };

  const fetchHistory = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const data = await blogService.getHistory(user.id);
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <Container fluid className="dashboard-container">
      <Row>
        <Col md={8} className="main-content p-4">
          <div className="welcome-section mb-4">
            <h2>Hi, {user?.username}! 👋</h2>
          </div>
          
          <Form onSubmit={handleSubmit} className="blog-form">
            <Form.Group className="mb-3">
              <div className="unified-search-container">
                <div className="search-type-selector">
                  <Button 
                    variant={searchType === 'keywords' ? 'primary' : 'light'}
                    onClick={() => setSearchType('keywords')}
                  >
                    Keywords
                  </Button>
                  <span className="separator">|</span>
                  <Button 
                    variant={searchType === 'sentence' ? 'primary' : 'light'}
                    onClick={() => setSearchType('sentence')}
                  >
                    Sentence
                  </Button>
                </div>
                <div className="search-input-wrapper">
                  <Form.Control
                    type="text"
                    placeholder={searchType === 'keywords' ? "Enter keywords" : "Enter your sentence"}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    required
                  />
                  <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm" />
                    ) : (
                      <FaSearch />
                    )}
                  </Button>
                </div>
              </div>
            </Form.Group>
          </Form>
          
          {/* Display generated content with formatter */}
          {generatedContent && (
            <div className="mt-4 p-4 border rounded bg-white shadow-sm">
              <h4 className="mb-3">Generated Content:</h4>
              <div className="generated-text">
                <ContentFormatter content={generatedContent} />
              </div>
            </div>
          )}
        </Col>
        
        <Col md={4} className="history-sidebar p-0 d-flex flex-column">
        <History 
            history={history}
            onHistoryItemClick={handleHistoryItemClick}
          />
          
          <div className="user-profile p-3 mt-auto">
            <div className="user-avatar">
              {user?.username?.[0].toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-email">{user?.email}</span>
              <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-basic">
                  <FaUserCircle />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/login">Switch Account</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;