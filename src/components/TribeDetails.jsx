import { useState } from 'react'
import { ArrowLeft, Settings, MoreVertical, Shield, Clock, Users as UsersIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Card, { CardContent } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import * as Tabs from '@radix-ui/react-tabs'

export default function TribeDetails({ tribe, onBack }) {
    const [activeTab, setActiveTab] = useState('overview')
    const navigate = useNavigate()

    const handleBack = () => {
        if (onBack) {
            onBack()
        } else {
            navigate('/my-tribes')
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Tribes</span>
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Tribe Info */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">{tribe.name}</h1>
                <p className="text-gray-600 mt-1">
                    {tribe.members} members • Active {tribe.activeToday > 0 ? `${tribe.activeToday * 10} mins ago` : 'recently'}
                </p>
            </div>

            {/* Tabs */}
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                <Tabs.List className="flex gap-6 border-b border-gray-200">
                    <Tabs.Trigger
                        value="overview"
                        className="pb-3 px-1 text-sm font-medium transition-colors relative data-[state=active]:text-primary data-[state=inactive]:text-gray-600 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary"
                    >
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Overview & Rules
                        </div>
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="problem-solving"
                        className="pb-3 px-1 text-sm font-medium transition-colors relative data-[state=active]:text-primary data-[state=inactive]:text-gray-600 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary"
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Problem Solving
                        </div>
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="chat"
                        className="pb-3 px-1 text-sm font-medium transition-colors relative data-[state=active]:text-primary data-[state=inactive]:text-gray-600 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary"
                    >
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Tribe Chat
                        </div>
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="members"
                        className="pb-3 px-1 text-sm font-medium transition-colors relative data-[state=active]:text-primary data-[state=inactive]:text-gray-600 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary"
                    >
                        <div className="flex items-center gap-2">
                            <UsersIcon className="w-4 h-4" />
                            Members
                        </div>
                    </Tabs.Trigger>
                </Tabs.List>

                {/* Overview Tab */}
                <Tabs.Content value="overview" className="mt-6 space-y-6">
                    {/* Rules & Expectations */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Shield className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-semibold text-gray-900">Rules & Expectations</h3>
                            </div>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Attend daily standups before 10 AM.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Update task status at the end of each sprint.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Be respectful and supportive in peer reviews.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Share one learning resource per week.</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Tribe Rituals */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-semibold text-gray-900">Tribe Rituals</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Daily Standup */}
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-gray-900">Daily Standup</h4>
                                        <Badge variant="default" className="text-xs">Daily</Badge>
                                    </div>
                                    <p className="text-sm text-gray-600">Quick 15-min sync on progress and blockers.</p>
                                </div>

                                {/* Weekly Review */}
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-gray-900">Weekly Review</h4>
                                        <Badge variant="default" className="text-xs">Weekly</Badge>
                                    </div>
                                    <p className="text-sm text-gray-600">Reflect on the past week's wins and learnings.</p>
                                </div>

                                {/* Deep Work Sprint */}
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-gray-900">Deep Work Sprint</h4>
                                        <Badge variant="default" className="text-xs">Sprint</Badge>
                                    </div>
                                    <p className="text-sm text-gray-600">Focus blocks for coding and problem solving.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Missed Ritual Message */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <p className="text-sm text-purple-800">
                            💜 Missed a ritual? No worries! Resume whenever you are ready. Consistency &gt; Perfection.
                        </p>
                    </div>

                    {/* Buddy Mode */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-4">
                                <UsersIcon className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-semibold text-gray-900">Buddy Mode</h3>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                            Y
                                        </div>
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium -ml-2">
                                            A
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Active Session</p>
                                        <p className="text-sm text-gray-600">Paired for accountability</p>
                                    </div>
                                </div>
                                <Badge variant="success" className="bg-green-100 text-green-700">Active</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </Tabs.Content>

                {/* Problem Solving Tab */}
                <Tabs.Content value="problem-solving" className="mt-6">
                    <Card className="py-16">
                        <div className="text-center">
                            <div className="text-6xl mb-4">💡</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Solving</h3>
                            <p className="text-gray-600">
                                Collaborate on challenges and share solutions with your tribe.
                            </p>
                        </div>
                    </Card>
                </Tabs.Content>

                {/* Tribe Chat Tab */}
                <Tabs.Content value="chat" className="mt-6">
                    <Card className="py-16">
                        <div className="text-center">
                            <div className="text-6xl mb-4">💬</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tribe Chat</h3>
                            <p className="text-gray-600">
                                Stay connected with your tribe members through group chat.
                            </p>
                        </div>
                    </Card>
                </Tabs.Content>

                {/* Members Tab */}
                <Tabs.Content value="members" className="mt-6">
                    <Card className="py-16">
                        <div className="text-center">
                            <div className="text-6xl mb-4">👥</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tribe Members</h3>
                            <p className="text-gray-600">
                                View and manage all members of your tribe.
                            </p>
                        </div>
                    </Card>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    )
}
