"use client"

import { useState, useEffect } from "react"

import React from 'react'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    })
    const[responseMessage, setResponseMessage] = useState("")
    const[newPost, setNewPost] = useState(null)
    const[isSubmitting, setIsSubmitting] = useState(false)
    const[shouldSubmit, setShouldSubmit] = useState(false) 

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setResponseMessage("")
        setShouldSubmit(true)
    }

    useEffect(() => {
        const submitForm = async () => {
            if (shouldSubmit) {
                try {
                    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    })

                    if (response.ok) {
                        const data = await response.json()
                        setResponseMessage("Success! Your post ID is: ${data.id}")
                        setNewPost(data)
                        setFormData({name: "", email: "", message: ""})
                    }
                    else{
                        setResponseMessage("Something went wrong. Please try again.")
                    }
                }catch (error) {
                    setResponseMessage("Error: " + error.message)
                }finally {
                    setIsSubmitting(false)
                    setShouldSubmit(false)
                }
            }
        }

        submitForm()
    }, [shouldSubmit, formData])

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>

        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>

        <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>

        <div>
           <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" disabled={isSubmitting}>
            {isSubmitting? 'Submitting...':'Submit'}
           </button>
           
        </div>

      </form>

      {responseMessage && (
        <p className="mt-4 text-center text-sm text-green-600">{responseMessage}</p>
      )}
      {newPost && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold">New Post Created</h2>
            <p><strong>Post ID:</strong>{newPost.id}</p>
            <p><strong>Name:</strong>{newPost.name}</p>
            <p><strong>Email:</strong>{newPost.email}</p>
            <p><strong>Message:</strong>{newPost.message}</p>
        </div>
      )}
    </div>
  )
}

export default ContactForm
