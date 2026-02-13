import { useState } from 'react'
import { Plus, Filter, Circle } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Select, { SelectTrigger, SelectContent, SelectItem, SelectValue } from '../components/ui/Select'
import CreateTaskModal from '../components/CreateTaskModal'
import * as Tabs from '@radix-ui/react-tabs'

export default function PendingTasks() {
    const [activeTab, setActiveTab] = useState('today')
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const handleCreateTask = (newTask) => {
        console.log('New task created:', newTask)
        // In a real app, this would add to a global state or API
        setIsCreateModalOpen(false)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Pending Tasks (0)</h1>
                    <p className="text-gray-600 mt-1">Manage and track your personal and tribe tasks</p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Task
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <div className="space-y-4">
                    {/* Time Filter Tabs */}
                    <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 mr-2">Show:</span>
                            <Tabs.List className="inline-flex bg-gray-100 rounded-lg p-1">
                                <Tabs.Trigger
                                    value="today"
                                    className="px-4 py-2 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-600"
                                >
                                    Today
                                </Tabs.Trigger>
                                <Tabs.Trigger
                                    value="week"
                                    className="px-4 py-2 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-600"
                                >
                                    This Week
                                </Tabs.Trigger>
                                <Tabs.Trigger
                                    value="later"
                                    className="px-4 py-2 text-sm font-medium rounded-md transition-colors data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-600"
                                >
                                    Later
                                </Tabs.Trigger>
                            </Tabs.List>
                        </div>
                    </Tabs.Root>

                    {/* Additional Filters */}
                    <div className="flex items-center gap-3">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Filter:</span>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">All</Button>
                            <Button variant="ghost" size="sm">Personal</Button>
                            <Button variant="ghost" size="sm">Tribe</Button>
                        </div>

                        <Select defaultValue="all-priorities">
                            <SelectTrigger className="w-[140px] h-9">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-priorities">All Priorities</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select defaultValue="all-status">
                            <SelectTrigger className="w-[120px] h-9">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-status">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </Card>

            {/* Empty State */}
            <Card className="py-16">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Circle className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your filters or create a new task</p>
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Task
                    </Button>
                    <p className="text-sm text-gray-500 mt-6">Showing 0 of 8 tasks</p>
                </div>
            </Card>

            {/* Create Task Modal */}
            <CreateTaskModal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                onCreateTask={handleCreateTask}
            />
        </div>
    )
}
