import React, { useState } from 'react';
import { GraduationCap, Users, Eye, EyeOff, BookOpen, Shield } from 'lucide-react';

const ImsLoginPage = () => {
    const [loginType, setLoginType] = useState('student');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        studentId: '',
        staffId: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', { loginType, formData });
        // Handle login logic here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">

                {/* Left Side - Branding */}
                <div className="hidden lg:flex flex-col items-center justify-center text-center space-y-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20 scale-150"></div>
                        <div className="relative bg-white rounded-full p-8 shadow-2xl">
                            <GraduationCap className="w-24 h-24 text-blue-600" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Institute Management
                        </h1>
                        <p className="text-xl text-gray-600 max-w-md">
                            Empowering education through seamless digital management
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-8">
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                            <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
                            <h3 className="font-semibold text-gray-800">Student Portal</h3>
                            <p className="text-sm text-gray-600 mt-1">Access courses, grades, and resources</p>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                            <Shield className="w-8 h-8 text-purple-600 mb-3" />
                            <h3 className="font-semibold text-gray-800">Staff Portal</h3>
                            <p className="text-sm text-gray-600 mt-1">Manage classes and student records</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">

                        {/* Mobile Header */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                                <GraduationCap className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Institute Management</h2>
                        </div>

                        {/* Login Type Selector */}
                        <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
                            <button
                                type="button"
                                onClick={() => setLoginType('student')}
                                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all duration-200 ${loginType === 'student'
                                        ? 'bg-white text-blue-600 shadow-md'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <GraduationCap className="w-5 h-5 mr-2" />
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setLoginType('staff')}
                                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-all duration-200 ${loginType === 'staff'
                                        ? 'bg-white text-purple-600 shadow-md'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <Users className="w-5 h-5 mr-2" />
                                Staff
                            </button>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">

                                {/* ID Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {loginType === 'student' ? 'Student ID' : 'Staff ID'}
                                    </label>
                                    <input
                                        type="text"
                                        name={loginType === 'student' ? 'studentId' : 'staffId'}
                                        value={loginType === 'student' ? formData.studentId : formData.staffId}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder={loginType === 'student' ? 'Enter your student ID' : 'Enter your staff ID'}
                                        required
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                        placeholder="Enter your email address"
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${loginType === 'student'
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                                        : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                                    }`}
                            >
                                Sign In as {loginType === 'student' ? 'Student' : 'Staff'}
                            </button>
                        </form>

                        {/* Additional Links */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="text-center space-y-3">
                                <p className="text-sm text-gray-600">
                                    Need help accessing your account?
                                </p>
                                <div className="flex justify-center space-x-4 text-sm">
                                    <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                        Contact Support
                                    </button>
                                    <span className="text-gray-300">|</span>
                                    <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                        Registration
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-6 text-sm text-gray-500">
                        <p>© 2025 Institute Management System. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImsLoginPage;
