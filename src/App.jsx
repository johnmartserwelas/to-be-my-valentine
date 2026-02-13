import { useState, useEffect, useRef } from 'react';
import './App.css';

/*
 * ═══════════════════════════════════════════════════════════════════════════
 * 💕 VALENTINE INVITATION WEBSITE - CONFIGURATION GUIDE 💕
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 📝 HOW TO CUSTOMIZE:
 * 
 * 1. PARTNER'S NAME: Change the value below
 *    Example: const PARTNER_NAME = "My Love";
 * 
 * 2. MESSAGE LINES: Edit the STORY_LINES array below
 *    Each line appears one by one with typing animation
 * 
 * 3. COLORS: Go to App.css and modify the CSS variables at the top:
 *    --primary-pink, --soft-lavender, --warm-peach, etc.
 * 
 * 4. MUSIC FILE: Place your music file in the public folder as "music.mp3"
 *    Or change the MUSIC_FILE constant below to your preferred filename
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

// 💖 CHANGE THIS: Your partner's name or nickname
const PARTNER_NAME = "My Dearest";

// 💖 CHANGE THIS: Your romantic story message lines
const STORY_LINES = [
  "From the moment we met...",
  "You made ordinary days feel special.",
  "Every smile, every laugh, every moment...",
  "They became my favorite memories.",
  "You're the reason I believe in magic.",
  "So I have one question for you..."
];

// 💖 CHANGE THIS: The final proposal question
const PROPOSAL_QUESTION = "Will you be my Valentine?";

// 💖 CHANGE THIS: Success message after "Yes" is clicked
const SUCCESS_MESSAGE = "This is the start of another beautiful memory together. 💕";

// 💖 CHANGE THIS: Music file path (place in public folder)
// The music file should be placed in the public folder
const MUSIC_FILE = "/Valentine.mp3";

// 💖 CHANGE THIS: "No" button text progression (gets more desperate each click)
const NO_BUTTON_TEXTS = [
  "Hmm, let me think...",
  "Are you sure?",
  "Really sure?",
  "Last chance...",
  "Pretty please? 🥺",
  "I'll be sad...",
  "You're breaking my heart! 💔"
];

function App() {
  // State management
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [showProposal, setShowProposal] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [isEnvelopeTouched, setIsEnvelopeTouched] = useState(false);
  
  const audioRef = useRef(null);

  // Typing animation effect for story lines - Smooth fade in
  useEffect(() => {
    if (!envelopeOpened || showProposal) return;

    if (currentLineIndex < STORY_LINES.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, STORY_LINES[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, 2200); // Smooth delay between lines

      return () => clearTimeout(timer);
    } else {
      // All lines shown, show proposal after a gentle delay
      const timer = setTimeout(() => {
        setShowProposal(true);
        triggerHeartAnimation();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, envelopeOpened, showProposal]);

  // Generate floating hearts for background - More Visible
  useEffect(() => {
    const generateHearts = () => {
      const newHearts = [];
      for (let i = 0; i < 25; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 8,
          duration: 20 + Math.random() * 20,
          size: 25 + Math.random() * 35,
          opacity: 0.25 + Math.random() * 0.25
        });
      }
      setFloatingHearts(newHearts);
    };
    generateHearts();
  }, []);

  // Generate sparkles for background
  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = [];
      for (let i = 0; i < 50; i++) {
        newSparkles.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 3 + Math.random() * 3,
          size: 2 + Math.random() * 4
        });
      }
      setSparkles(newSparkles);
    };
    generateSparkles();
  }, []);

  // Trigger celebration hearts animation
  const triggerHeartAnimation = () => {
    const newHearts = [];
    for (let i = 0; i < 50; i++) {
      newHearts.push({
        id: Date.now() + i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        size: 20 + Math.random() * 35,
        color: ['#FFB6C1', '#FF69B4', '#FFC0CB', '#FF1493', '#DB7093', '#E6A8D7', '#F8A5C2'][Math.floor(Math.random() * 7)]
      });
    }
    setHearts(newHearts);
  };

  // Trigger confetti burst
  const triggerConfetti = () => {
    const newConfetti = [];
    const colors = ['#FFD700', '#FF69B4', '#FFB6C1', '#E6A8D7', '#FFCAB0', '#D4A5FF', '#FF6B9D'];
    for (let i = 0; i < 150; i++) {
      newConfetti.push({
        id: Date.now() + i,
        left: 50,
        delay: Math.random() * 0.5,
        duration: 3 + Math.random() * 4,
        size: 8 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        spread: (Math.random() - 0.5) * 100
      });
    }
    setConfetti(newConfetti);
  };

  // Handle envelope click
  const handleEnvelopeClick = () => {
    setEnvelopeOpened(true);
    setShowEnvelope(false);
  };

  // Handle touch start for envelope (shows flap animation on mobile)
  const handleEnvelopeTouchStart = () => {
    setIsEnvelopeTouched(true);
  };

  // Handle touch end for envelope
  const handleEnvelopeTouchEnd = (e) => {
    e.preventDefault();
    if (isEnvelopeTouched) {
      // Small delay to show the flap animation before opening
      setTimeout(() => {
        handleEnvelopeClick();
      }, 300);
    }
  };

  // Handle "Yes" button click
  const handleYesClick = () => {
    setShowCelebration(true);
    triggerHeartAnimation();
    triggerConfetti();
    
    // Play music if available
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => {
        // Audio play failed, likely no user interaction yet
      });
      
      // Fade in music
      let volume = 0;
      const fadeIn = setInterval(() => {
        volume += 0.05;
        if (volume >= 0.5) {
          volume = 0.5;
          clearInterval(fadeIn);
        }
        audioRef.current.volume = volume;
      }, 100);
    }
  };

  // Handle "No" button click
  const handleNoClick = () => {
    if (noClickCount < NO_BUTTON_TEXTS.length - 1) {
      setNoClickCount(prev => prev + 1);
    }
  };

  // Calculate button sizes based on "No" clicks
  const yesButtonScale = 1 + noClickCount * 0.12;
  const noButtonScale = Math.max(0.6, 1 - noClickCount * 0.08);

  return (
    <div className="app">
      {/* Background music */}
      <audio ref={audioRef} src={MUSIC_FILE} loop />
      
      {/* Animated background */}
      <div className="animated-background">
        <div className="gradient-overlay"></div>
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
        
        {/* Floating hearts background */}
        {floatingHearts.map(heart => (
          <div
            key={heart.id}
            className="floating-heart-bg"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              fontSize: `${heart.size}px`,
              opacity: heart.opacity
            }}
          >
            ♡
          </div>
        ))}
        
        {/* Sparkles */}
        {sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.duration}s`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="content-container">
        
        {/* Envelope opening animation */}
        {showEnvelope && (
          <div 
            className="envelope-container" 
            onClick={handleEnvelopeClick}
            onTouchStart={handleEnvelopeTouchStart}
            onTouchEnd={handleEnvelopeTouchEnd}
          >
            <div className={`envelope ${isEnvelopeTouched ? 'touched' : ''}`}>
              <div className="envelope-shadow"></div>
              <div className="envelope-back"></div>
              <div className="envelope-letter">
                <div className="letter-content">
                  <span className="letter-heart">💕</span>
                </div>
              </div>
              <div className="envelope-flap"></div>
              <div className="envelope-body">
                <div className="envelope-heart">💌</div>
                <p className="envelope-text">Tap to open</p>
              </div>
            </div>
            <p className="envelope-hint">A special message awaits you...</p>
          </div>
        )}

        {/* Story content after envelope opens */}
        {envelopeOpened && !showCelebration && (
          <div className="story-container">
            <div className="card-glow"></div>
            <div className="card-border"></div>
            
            <div className="story-content">
              <div className="decorative-line top-line"></div>
              
              <h1 className="greeting">
                <span className="greeting-decor">✦</span>
                {PARTNER_NAME}
                <span className="greeting-decor">✦</span>
              </h1>
              
              <div className="story-lines">
                {displayedLines.map((line, index) => (
                  <p
                    key={index}
                    className="story-line"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <span className="line-number">{String(index + 1).padStart(2, '0')}</span>
                    {line}
                  </p>
                ))}
              </div>

              {/* Proposal section */}
              {showProposal && (
                <div className="proposal-container">
                  <div className="proposal-glow"></div>
                  
                  {/* Celebration hearts */}
                  {hearts.map(heart => (
                    <div
                      key={heart.id}
                      className="celebration-heart"
                      style={{
                        left: `${heart.left}%`,
                        animationDelay: `${heart.delay}s`,
                        fontSize: `${heart.size}px`,
                        color: heart.color
                      }}
                    >
                      ❤
                    </div>
                  ))}
                  
                  <h2 className="proposal-question">{PROPOSAL_QUESTION}</h2>
                  
                  <div className="buttons-container">
                    <button
                      className="yes-button"
                      onClick={handleYesClick}
                      style={{ transform: `scale(${yesButtonScale})` }}
                    >
                      <span className="btn-bg"></span>
                      <span className="btn-text">Yes, of course 💖</span>
                      <span className="btn-shine"></span>
                    </button>
                    <button
                      className="no-button"
                      onClick={handleNoClick}
                      style={{ transform: `scale(${noButtonScale})` }}
                    >
                      {NO_BUTTON_TEXTS[noClickCount]}
                    </button>
                  </div>
                </div>
              )}
              
              <div className="decorative-line bottom-line"></div>
            </div>
          </div>
        )}

        {/* Celebration overlay */}
        {showCelebration && (
          <div className="celebration-overlay">
            {/* Confetti */}
            {confetti.map(piece => (
              <div
                key={piece.id}
                className="confetti"
                style={{
                  left: `${piece.left}%`,
                  animationDelay: `${piece.delay}s`,
                  animationDuration: `${piece.duration}s`,
                  width: `${piece.size}px`,
                  height: `${piece.size * 0.6}px`,
                  backgroundColor: piece.color,
                  transform: `rotate(${piece.rotation}deg)`,
                  '--spread': `${piece.spread}vw`
                }}
              />
            ))}
            
            <div className="celebration-content">
              <div className="celebration-hearts">
                {hearts.map(heart => (
                  <div
                    key={heart.id}
                    className="celebration-heart-final"
                    style={{
                      left: `${heart.left}%`,
                      animationDelay: `${heart.delay}s`,
                      fontSize: `${heart.size}px`,
                      color: heart.color
                    }}
                  >
                    ❤
                  </div>
                ))}
              </div>
              
              <div className="celebration-card">
                <div className="celebration-icon">💕</div>
                <h1 className="celebration-title">Yay!</h1>
                <p className="celebration-message">{SUCCESS_MESSAGE}</p>
                <div className="celebration-sparkles">
                  ✨ 💝 ✨ 💝 ✨
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
