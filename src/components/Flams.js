import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import backgroundImage from '../assets/flams-bg.jpg';
import logoIcon from '../assets/logo.jpg';
import './Flams.css';

export const Flams = () => {
    const { connected, disconnect } = useWallet();
    const [aiStats, setAiStats] = useState({
        intelligence: 100,
        adaptability: 85,
        marketEngagement: 'High',
        evolution: 0,
        power: 92,
        efficiency: 88,
        personality: {
            creativity: 78,
            logic: 92,
            intuition: 85,
            resilience: 90
        },
        achievements: [],
        networkStrength: 75,
        predictionAccuracy: 89,
        learningRate: 0.85,
        battleStats: {
            wins: 0,
            losses: 0,
            winStreak: 0
        },
        tradingPerformance: {
            totalTrades: 0,
            successfulTrades: 0,
            profitLoss: 0,
            bestTrade: 0
        }
    });

    const [battleMode, setBattleMode] = useState(false);
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [showAchievement, setShowAchievement] = useState(null);
    const [marketAnalysis, setMarketAnalysis] = useState({
        sentiment: 'Bullish',
        confidence: 85,
        riskLevel: 'Medium',
        recommendations: []
    });

    const [copied, setCopied] = useState(false);
    const contractAddress = "deploying...";

    // Achievements list
    const achievements = [
        { id: 'first_win', name: 'First Victory', description: 'Win your first AI battle' },
        { id: 'streak_5', name: 'Winning Streak', description: 'Win 5 battles in a row' },
        { id: 'evolution_50', name: 'Half Way There', description: 'Reach evolution level 50' },
        { id: 'profit_master', name: 'Profit Master', description: 'Achieve 1000 SOL in profits' }
    ];

    // Market recommendations
    const generateRecommendations = () => {
        const recommendations = [
            'Accumulate during market dips',
            'Hold position, market showing strength',
            'Consider taking profits',
            'Increase position size gradually',
            'Monitor support levels'
        ];
        return recommendations[Math.floor(Math.random() * recommendations.length)];
    };

    // Battle system
    const initiateBattle = () => {
        setBattleMode(true);
        const battleResult = Math.random() > 0.4; // 60% win rate
        const profitLoss = battleResult ? 
            Math.random() * 100 + 50 : 
            -(Math.random() * 50 + 25);

        setTimeout(() => {
            setAiStats(prev => {
                const newStats = {
                    ...prev,
                    battleStats: {
                        wins: prev.battleStats.wins + (battleResult ? 1 : 0),
                        losses: prev.battleStats.losses + (battleResult ? 0 : 1),
                        winStreak: battleResult ? prev.battleStats.winStreak + 1 : 0
                    },
                    tradingPerformance: {
                        ...prev.tradingPerformance,
                        totalTrades: prev.tradingPerformance.totalTrades + 1,
                        successfulTrades: prev.tradingPerformance.successfulTrades + (battleResult ? 1 : 0),
                        profitLoss: prev.tradingPerformance.profitLoss + profitLoss,
                        bestTrade: Math.max(prev.tradingPerformance.bestTrade, profitLoss)
                    }
                };

                // Check for achievements
                if (battleResult && newStats.battleStats.wins === 1) {
                    setShowAchievement(achievements[0]);
                } else if (newStats.battleStats.winStreak === 5) {
                    setShowAchievement(achievements[1]);
                }

                return newStats;
            });

            setBattleMode(false);
        }, 3000);
    };

    useEffect(() => {
        if (connected) {
            const interval = setInterval(() => {
                setAiStats(prev => {
                    const newEvolution = prev.evolution + 1;
                    
                    if (newEvolution === 50) {
                        setShowAchievement(achievements[2]);
                    }

                    return {
                        ...prev,
                        intelligence: prev.intelligence + Math.random() * 2,
                        evolution: newEvolution,
                        power: Math.min(100, prev.power + Math.random()),
                        efficiency: Math.min(100, prev.efficiency + Math.random() * 0.5),
                        personality: {
                            ...prev.personality,
                            creativity: Math.min(100, prev.personality.creativity + Math.random()),
                            logic: Math.min(100, prev.personality.logic + Math.random() * 0.5),
                            intuition: Math.min(100, prev.personality.intuition + Math.random() * 0.7),
                            resilience: Math.min(100, prev.personality.resilience + Math.random() * 0.3)
                        }
                    };
                });

                // Update market analysis
                setMarketAnalysis(prev => ({
                    ...prev,
                    confidence: Math.min(100, prev.confidence + (Math.random() * 10 - 5)),
                    sentiment: Math.random() > 0.5 ? 'Bullish' : 'Bearish',
                    riskLevel: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
                    recommendations: [generateRecommendations()]
                }));
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [connected]);

    const handleDisconnect = async () => {
        try {
            await disconnect();
        } catch (error) {
            console.error('Error disconnecting wallet:', error);
        }
    };

    const handleTwitterClick = () => {
        window.open('https://x.com/EF3', '_blank');
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(contractAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const renderPersonalityChart = () => {
        const { creativity, logic, intuition, resilience } = aiStats.personality;
        return (
            <div className="personality-chart">
                <h3>AI Personality Matrix</h3>
                <div className="trait-bars">
                    <div className="trait-bar">
                        <span>Creativity</span>
                        <div className="bar">
                            <div className="fill" style={{ width: `${creativity}%` }}></div>
                        </div>
                    </div>
                    <div className="trait-bar">
                        <span>Logic</span>
                        <div className="bar">
                            <div className="fill" style={{ width: `${logic}%` }}></div>
                        </div>
                    </div>
                    <div className="trait-bar">
                        <span>Intuition</span>
                        <div className="bar">
                            <div className="fill" style={{ width: `${intuition}%` }}></div>
                        </div>
                    </div>
                    <div className="trait-bar">
                        <span>Resilience</span>
                        <div className="bar">
                            <div className="fill" style={{ width: `${resilience}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderNeuralNetwork = () => {
        return (
            <div className="neural-network">
                <h3>Neural Network Status</h3>
                <div className="network-stats">
                    <div className="network-stat">
                        <span>Network Strength</span>
                        <div className="circular-progress">
                            <div className="inner">
                                <span>{aiStats.networkStrength.toFixed(1)}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="network-stat">
                        <span>Prediction Accuracy</span>
                        <div className="circular-progress">
                            <div className="inner">
                                <span>{aiStats.predictionAccuracy.toFixed(1)}%</span>
                            </div>
                        </div>
                    </div>
                    <div className="network-stat">
                        <span>Learning Rate</span>
                        <div className="circular-progress">
                            <div className="inner">
                                <span>{(aiStats.learningRate * 100).toFixed(1)}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderBattleArena = () => {
        return (
            <div className="battle-arena">
                <h3>AI Trading Battle Arena</h3>
                <div className="battle-stats">
                    <div className="stat">
                        <span>Wins</span>
                        <p>{aiStats.battleStats.wins}</p>
                    </div>
                    <div className="stat">
                        <span>Win Streak</span>
                        <p>{aiStats.battleStats.winStreak}</p>
                    </div>
                    <div className="stat">
                        <span>Win Rate</span>
                        <p>
                            {aiStats.battleStats.wins + aiStats.battleStats.losses > 0 
                                ? ((aiStats.battleStats.wins / (aiStats.battleStats.wins + aiStats.battleStats.losses)) * 100).toFixed(1)
                                : 0}%
                        </p>
                    </div>
                </div>
                <button 
                    className={`battle-button ${battleMode ? 'battling' : ''}`}
                    onClick={initiateBattle}
                    disabled={battleMode}
                >
                    {battleMode ? 'Battle in Progress...' : 'Start Trading Battle'}
                </button>
            </div>
        );
    };

    const renderMarketAnalysis = () => {
        return (
            <div className="market-analysis">
                <h3>Real-time Market Analysis</h3>
                <div className="analysis-grid">
                    <div className="analysis-card">
                        <h4>Market Sentiment</h4>
                        <p className={marketAnalysis.sentiment.toLowerCase()}>
                            {marketAnalysis.sentiment}
                        </p>
                        <div className="confidence-meter">
                            <div 
                                className="confidence-fill"
                                style={{width: `${marketAnalysis.confidence}%`}}
                            ></div>
                        </div>
                    </div>
                    <div className="analysis-card">
                        <h4>Risk Level</h4>
                        <p className={`risk-${marketAnalysis.riskLevel.toLowerCase()}`}>
                            {marketAnalysis.riskLevel}
                        </p>
                    </div>
                    <div className="analysis-card recommendations">
                        <h4>AI Recommendations</h4>
                        <ul>
                            {marketAnalysis.recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    // Add evolutionMilestones definition
    const evolutionMilestones = [
        { level: 10, name: "Basic Consciousness", description: "AI has developed primary market awareness" },
        { level: 25, name: "Pattern Recognition", description: "Advanced pattern detection in market trends" },
        { level: 50, name: "Strategic Thinking", description: "Development of complex trading strategies" },
        { level: 75, name: "Market Mastery", description: "Achieved superior market prediction capabilities" },
        { level: 100, name: "Quantum Intelligence", description: "Reached maximum evolution potential" }
    ];

    // Add bgStyle definition
    const bgStyle = {
        background: `linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.95),
            rgba(0, 40, 70, 0.90)
        ),
        url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
    };

    const [aiMetrics, setAiMetrics] = useState({
        intelligenceLevel: 109.82,
        powerLevel: 96.5,
        adaptability: 85,
        marketEngagement: 92,
        creativity: 88,
        logic: 94,
        intuition: 87,
        resilience: 91,
    });

    const [networkStatus, setNetworkStatus] = useState('OPTIMAL');
    const [marketStatus, setMarketStatus] = useState('HIGH');

    const renderMetricsGrid = () => (
        <div className="metrics-grid">
            {/* Intelligence Level */}
            <div className="metric-card glitch-effect featured">
                <div className="metric-header">
                    <span className="metric-icon">🧠</span>
                    INTELLIGENCE LEVEL
                </div>
                <div className="metric-value highlighted">
                    {aiMetrics.intelligenceLevel}
                </div>
                <div className="metric-status">
                    STATUS: ENHANCED
                </div>
            </div>

            {/* Power Level */}
            <div className="metric-card glitch-effect">
                <div className="metric-header">
                    <span className="metric-icon">⚡</span>
                    POWER LEVEL
                </div>
                <div className="progress-ring">
                    <svg viewBox="0 0 36 36">
                        <path d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="rgba(0, 255, 136, 0.1)"
                            strokeWidth="3"
                        />
                        <path d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="3"
                            strokeDasharray={`${aiMetrics.powerLevel}, 100`}
                        />
                    </svg>
                    <div className="percentage">{aiMetrics.powerLevel}%</div>
                </div>
            </div>

            {/* Market Engagement */}
            <div className="metric-card glitch-effect market">
                <div className="metric-header">
                    <span className="metric-icon">📈</span>
                    MARKET ENGAGEMENT
                </div>
                <div className="market-status">
                    <span className="status-text">{marketStatus}</span>
                    <div className="market-indicator"></div>
                </div>
            </div>

            {/* AI Personality Matrix */}
            <div className="metric-card glitch-effect matrix-card">
                <div className="metric-header">
                    <span className="metric-icon">🔮</span>
                    AI PERSONALITY MATRIX
                </div>
                <div className="matrix-grid">
                    {['Creativity', 'Logic', 'Intuition', 'Resilience'].map(trait => (
                        <div key={trait} className="matrix-item">
                            <span className="trait-name">{trait}</span>
                            <div className="trait-bar">
                                <div 
                                    className="trait-fill"
                                    style={{width: `${aiMetrics[trait.toLowerCase()]}%`}}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const [systemLogs, setSystemLogs] = useState([
        "INITIALIZING NEURAL NETWORK...",
        "QUANTUM PROCESSORS ONLINE",
        "BLOCKCHAIN INTEGRATION COMPLETE",
        "AI CORE SYSTEMS OPERATIONAL"
    ]);

    const addSystemLog = (log) => {
        setSystemLogs(prev => [...prev, log].slice(-5));
    };

    const renderSystemTerminal = () => (
        <div className="system-terminal">
            <div className="terminal-header">
                <span className="terminal-title">SYSTEM LOGS</span>
                <div className="terminal-controls">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className="terminal-content">
                {systemLogs.map((log, index) => (
                    <div key={index} className="log-entry">
                        <span className="timestamp">{new Date().toLocaleTimeString()}</span>
                        <span className="log-text">{log}</span>
                    </div>
                ))}
                <div className="terminal-cursor"></div>
            </div>
        </div>
    );

    return (
        <div className="flams-container modern-theme" style={bgStyle}>
            <div className="nav-bar">
                <div className="nav-left">
                    <img src={logoIcon} alt="FLAMS" className="nav-logo" />
                    <div className="nav-title">FLAMS AI</div>
                </div>
                
                <div className="nav-center">
                    <div className="contract-display">
                        <div className="contract-label">Smart Contract</div>
                        <div className="contract-value">
                            <span className="address-text">{contractAddress}</span>
                            <button 
                                className="copy-btn"
                                onClick={copyToClipboard}
                            >
                                {copied ? (
                                    <span className="copy-success">✓</span>
                                ) : (
                                    <svg className="copy-icon" viewBox="0 0 24 24">
                                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="nav-right">
                    <button 
                        className="x-button"
                        onClick={handleTwitterClick}
                    >
                        <svg viewBox="0 0 24 24" className="x-icon">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        <span>@EF3</span>
                    </button>
                    
                    <div className="wallet-section">
                        <WalletMultiButton />
                        {connected && (
                            <button 
                                className="disconnect-btn"
                                onClick={disconnect}
                            >
                                Disconnect
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="header">
                <div className="title-container">
                    <h1>FLAMS AI</h1>
                    <div className="glowing-line"></div>
                </div>
                <p className="subtitle">
                    First innovative AI designed to evolve dynamically on-chain
                </p>
                {!connected && (
                    <div className="connect-prompt">
                        <p>Connect your wallet to witness the evolution</p>
                        <div className="pulse-arrow">↓</div>
                    </div>
                )}
            </div>

            {connected && (
                <div className="ai-dashboard">
                    {showAchievement && (
                        <div className="achievement-popup" onClick={() => setShowAchievement(null)}>
                            <div className="achievement-content">
                                <h3>🏆 Achievement Unlocked!</h3>
                                <h4>{showAchievement.name}</h4>
                                <p>{showAchievement.description}</p>
                            </div>
                        </div>
                    )}

                    <div className="dashboard-header">
                        <h2>AI Evolution Dashboard</h2>
                        <div className="evolution-badge">
                            Cycle #{aiStats.evolution}
                        </div>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card primary">
                            <div className="stat-icon">
                                <img src={logoIcon} alt="Intelligence" />
                            </div>
                            <h3>Intelligence Level</h3>
                            <div className="stat-value">
                                <div className="progress-bar">
                                    <div 
                                        className="progress" 
                                        style={{width: `${Math.min(100, aiStats.intelligence)}%`}}
                                    ></div>
                                </div>
                                <p>{aiStats.intelligence.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <img src={logoIcon} alt="Power" />
                            </div>
                            <h3>Power Level</h3>
                            <div className="stat-value">
                                <div className="progress-bar">
                                    <div 
                                        className="progress" 
                                        style={{width: `${aiStats.power}%`}}
                                    ></div>
                                </div>
                                <p>{aiStats.power.toFixed(1)}</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <img src={logoIcon} alt="Adaptability" />
                            </div>
                            <h3>Adaptability</h3>
                            <div className="stat-value">
                                <div className="progress-bar">
                                    <div 
                                        className="progress" 
                                        style={{width: `${aiStats.adaptability}%`}}
                                    ></div>
                                </div>
                                <p>{aiStats.adaptability}</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <img src={logoIcon} alt="Market" />
                            </div>
                            <h3>Market Engagement</h3>
                            <div className="stat-value">
                                <div className="engagement-indicator">
                                    {aiStats.marketEngagement}
                                </div>
                            </div>
                        </div>
                    </div>

                    {renderPersonalityChart()}
                    {renderNeuralNetwork()}

                    <div className="evolution-timeline">
                        <h3>Evolution Milestones</h3>
                        <div className="timeline">
                            {evolutionMilestones.map((milestone, index) => (
                                <div 
                                    key={index}
                                    className={`milestone ${aiStats.evolution >= milestone.level ? 'achieved' : ''}`}
                                >
                                    <div className="milestone-dot"></div>
                                    <div className="milestone-content">
                                        <h4>{milestone.name}</h4>
                                        <p>Level {milestone.level}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {renderBattleArena()}
                    {renderMarketAnalysis()}
                </div>
            )}

            <div className="dashboard-content">
                <div className="evolution-dashboard">
                    <div className="dashboard-header">
                        <h2 className="section-title">
                            <span className="title-icon">🧠</span>
                            AI EVOLUTION MATRIX
                            <div className="header-line"></div>
                        </h2>
                        <div className="matrix-status">
                            <span className="status-dot"></span>
                            SYSTEM ONLINE
                        </div>
                    </div>
                    {renderMetricsGrid()}
                    {renderSystemTerminal()}
                </div>
            </div>
        </div>
    );
}; 
