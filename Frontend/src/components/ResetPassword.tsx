import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMail, FiLock, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // 1: email, 2: verification, 3: new password
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        
        if (timer > 0 && step === 2) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer, step]);

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setIsError(false);
        
        try {
            const response = await axios.post('http://localhost:8080/api/password/reset-request', { email });
            setMessage('Verification code has been sent to your email');
            setStep(2);
            setIsError(false);
            setTimer(120); // 2 minute countdown for resending code
        } catch (error) {
            setMessage('Error sending verification code. Please try again.');
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setIsError(false);
        
        try {
            const response = await axios.post('http://localhost:8080/api/password/validate-token', {
                token: verificationCode,
            });
            
            if (response.data.valid) {
                setMessage('Code verified successfully');
                setStep(3);
                setIsError(false);
            } else {
                setMessage(`Invalid verification code: ${response.data.reason}`);
                setIsError(true);
            }
        } catch (error) {
            setMessage('Error verifying code. Please try again.');
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            setIsError(true);
            return;
        }
        
        if (newPassword.length < 8) {
            setMessage('Password must be at least 8 characters long');
            setIsError(true);
            return;
        }
        
        setLoading(true);
        setIsError(false);
        
        try {
            const response = await axios.post('http://localhost:8080/api/password/reset', {
                token: verificationCode,
                newPassword,
            });
            
            setMessage('Password reset successful! Redirecting to login...');
            setIsError(false);
            
            // Redirect to login page after 3 seconds
            setTimeout(() => {
                window.location.href = '/login';
            }, 3000);
            
        } catch (error) {
            setMessage('Error resetting password. The code may have expired.');
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    const resendCode = async () => {
        if (timer > 0) return;
        
        setLoading(true);
        setIsError(false);
        
        try {
            await axios.post('http://localhost:8080/api/password/reset-request', { email });
            setMessage('A new verification code has been sent to your email');
            setIsError(false);
            setTimer(120); // Reset the timer
        } catch (error) {
            setMessage('Error sending verification code');
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-2xl transition-all duration-300 transform hover:shadow-xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-100 mb-2">Reset Password</h2>
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-1 bg-blue-600 rounded"></div>
                    </div>
                    <p className="text-gray-400">Follow the steps to reset your password</p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-8 px-4">
                    <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                            step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                        } transition-colors duration-300`}>
                            <FiMail size={18} />
                        </div>
                        <span className="text-xs mt-1 text-gray-300">Email</span>
                    </div>
                    <div className={`flex-1 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-700'} transition-colors duration-300`}></div>
                    <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                            step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                        } transition-colors duration-300`}>
                            <span className="text-sm font-medium">123</span>
                        </div>
                        <span className="text-xs mt-1 text-gray-300">Verify</span>
                    </div>
                    <div className={`flex-1 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-700'} transition-colors duration-300`}></div>
                    <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
                            step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                        } transition-colors duration-300`}>
                            <FiLock size={18} />
                        </div>
                        <span className="text-xs mt-1 text-gray-300">Reset</span>
                    </div>
                </div>

                {/* Message Section */}
                {message && (
                    <div className={`mb-6 p-3 rounded-lg flex items-center ${
                        isError ? 'bg-red-900/30 text-red-300' : 'bg-green-900/30 text-green-300'
                    }`}>
                        {isError ? (
                            <FiAlertTriangle className="mr-2 flex-shrink-0" />
                        ) : (
                            <FiCheckCircle className="mr-2 flex-shrink-0" />
                        )}
                        <p className="text-sm">{message}</p>
                    </div>
                )}

                {/* Step 1: Email Form */}
                {step === 1 && (
                    <form onSubmit={handleSendCode} className="space-y-6">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-gray-100 placeholder-gray-400"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg text-white font-medium 
                            ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
                            transition-colors duration-300 flex justify-center`}
                        >
                            {loading ? 'Sending...' : 'Send Verification Code'}
                        </button>
                    </form>
                )}

                {/* Step 2: Verification Form */}
                {step === 2 && (
                    <form onSubmit={handleVerifyCode} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-gray-100 placeholder-gray-400"
                                placeholder="Enter 6-digit code"
                                maxLength={6}
                                pattern="[0-9]{6}"
                                required
                            />
                            <p className="mt-2 text-sm text-gray-400">
                                Please enter the 6-digit code sent to your email
                            </p>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg text-white font-medium 
                            ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
                            transition-colors duration-300`}
                        >
                            {loading ? 'Verifying...' : 'Verify Code'}
                        </button>
                        
                        <div className="text-center">
                            <p className="text-sm text-gray-400 mb-2">
                                Didn't receive a code?
                            </p>
                            <button
                                type="button"
                                onClick={resendCode}
                                disabled={timer > 0 || loading}
                                className={`text-sm font-medium ${
                                    timer > 0 || loading ? 'text-gray-600 cursor-not-allowed' : 'text-blue-400 hover:text-blue-300'
                                }`}
                            >
                                {timer > 0 ? `Resend code in ${formatTime(timer)}` : 'Resend code'}
                            </button>
                        </div>
                    </form>
                )}

                {/* Step 3: New Password Form */}
                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-gray-100 placeholder-gray-400"
                                    placeholder="Enter new password"
                                    minLength={8}
                                    required
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-400">
                                Password must be at least 8 characters long
                            </p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-gray-100 placeholder-gray-400"
                                    placeholder="Confirm new password"
                                    required
                                />
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg text-white font-medium 
                            ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
                            transition-colors duration-300`}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}

                {/* Footer */}
                <div className="mt-8 text-center">
                    <a href="/login" className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                        Return to Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;