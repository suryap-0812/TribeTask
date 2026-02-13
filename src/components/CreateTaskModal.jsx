import { useState } from 'react'
import { Star } from 'lucide-react'
import Modal, { ModalClose } from './ui/Modal'
import { Input, Textarea, Label } from './ui/Input'
import Button from './ui/Button'
import { tribes } from '../data/mockData'

export default function CreateTaskModal({ open, onOpenChange, onCreateTask }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        taskType: 'personal',
        tribe: '',
        starred: false,
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!formData.title.trim()) {
            alert('Please enter a task title')
            return
        }

        const newTask = {
            id: Date.now(),
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            status: 'pending',
            dueDate: formData.dueDate ? new Date(formData.dueDate) : new Date(),
            tribe: formData.taskType === 'tribe' ? formData.tribe : 'Personal',
            completed: false,
            starred: formData.starred,
            completedAt: null,
            tags: [],
        }

        onCreateTask(newTask)

        // Reset form
        setFormData({
            title: '',
            description: '',
            dueDate: '',
            priority: 'medium',
            taskType: 'personal',
            tribe: '',
            starred: false,
        })

        onOpenChange(false)
    }

    return (
        <Modal open={open} onOpenChange={onOpenChange} title="Create Task">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Task Title */}
                <div>
                    <Label htmlFor="title">
                        Task Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="title"
                        placeholder="What needs to be done?"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="mt-1"
                        autoFocus
                    />
                </div>

                {/* Description */}
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Add details..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="mt-1"
                        rows={3}
                    />
                </div>

                {/* Due Date and Priority */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            id="dueDate"
                            type="date"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label>Priority</Label>
                        <div className="flex gap-2 mt-1">
                            {['low', 'medium', 'high'].map((priority) => (
                                <button
                                    key={priority}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, priority })}
                                    className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${formData.priority === priority
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Task Type and Importance */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Task Type</Label>
                        <div className="flex gap-3 mt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="taskType"
                                    value="personal"
                                    checked={formData.taskType === 'personal'}
                                    onChange={(e) => setFormData({ ...formData, taskType: e.target.value, tribe: '' })}
                                    className="w-4 h-4 text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-gray-700">Personal</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="taskType"
                                    value="tribe"
                                    checked={formData.taskType === 'tribe'}
                                    onChange={(e) => setFormData({ ...formData, taskType: e.target.value })}
                                    className="w-4 h-4 text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-gray-700">Tribe</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <Label>Importance</Label>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, starred: !formData.starred })}
                            className="flex items-center gap-2 mt-1 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            <Star className={`w-4 h-4 ${formData.starred ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} />
                            <span>{formData.starred ? 'Starred' : 'Add Star'}</span>
                        </button>
                    </div>
                </div>

                {/* Tribe Selection (if tribe type) */}
                {formData.taskType === 'tribe' && (
                    <div>
                        <Label htmlFor="tribe">Select Tribe</Label>
                        <select
                            id="tribe"
                            value={formData.tribe}
                            onChange={(e) => setFormData({ ...formData, tribe: e.target.value })}
                            className="mt-1 w-full h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="">Choose a tribe...</option>
                            {tribes.map((tribe) => (
                                <option key={tribe.id} value={tribe.name}>
                                    {tribe.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <ModalClose asChild>
                        <Button type="button" variant="ghost">
                            Cancel
                        </Button>
                    </ModalClose>
                    <Button type="submit" variant="primary">
                        Create Task
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
