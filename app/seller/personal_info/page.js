'use client'

import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const OCCUPATIONS = [
  "web developer",
  "app developer",
  "graphic designer",
  "ui/ux designer",
  "marketing",
  "writing",
  "video and animation",
]

export default function PersonalInfoPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    profilePic: null,
    education: "",
    contactEmail: "",
    contactPhone: "",
    description: "",
    occupations: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleCheckbox = (occ) => {
    setFormData((prev) => {
      const exists = prev.occupations.includes(occ)
      return {
        ...prev,
        occupations: exists
          ? prev.occupations.filter((o) => o !== occ)
          : [...prev.occupations, occ],
      }
    })
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const body = new FormData()
    Object.entries(formData).forEach(([k, v]) => {
      if (k === "occupations") {
        v.forEach((occ) => body.append("occupations", occ))
      } else {
        body.append(k, v)
      }
    })

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/personal_info`, {
        credentials: "include",
        method: "POST",
        body,
        cache: "no-store",
      })
      if (!res.ok) throw new Error("Failed to save")
      alert("Saved!")
      router.push("/gig_info")
    } catch (err) {
      console.error(err)
      alert(err.message)
    } finally {
    setIsSubmitting(false)
  }
  }

  return (
    <div className='min-h-screen bg-gray-950'>
    <main className="container mx-auto max-w-3xl py-8 px-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Personal Information</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required className="bg-gray-800 text-white border-gray-700" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="profilePic">Profile Picture</Label>
          <Input id="profilePic" name="profilePic" type="file" accept="image/*" onChange={handleChange} className="bg-gray-800 text-white border-gray-700 file:text-white file:bg-gray-700" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="education">Education</Label>
          <Input id="education" name="education" value={formData.education} onChange={handleChange} placeholder="e.g. B.Tech in Computer Science" className="bg-gray-800 text-white border-gray-700" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input id="contactEmail" name="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} className="bg-gray-800 text-white border-gray-700" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input id="contactPhone" name="contactPhone" type="tel" value={formData.contactPhone} onChange={handleChange} className="bg-gray-800 text-white border-gray-700" />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={5} className="bg-gray-800 text-white border-gray-700" />
        </div>

        <fieldset className="grid gap-4">
          <legend className="font-medium">Occupation (select all that apply)</legend>
          <div className="grid sm:grid-cols-2 gap-2">
            {OCCUPATIONS.map((occ) => (
              <label key={occ} className="flex items-center gap-2">
                <Checkbox
                  id={occ}
                  checked={formData.occupations.includes(occ)}
                  onCheckedChange={() => handleCheckbox(occ)}
                />
                <span className="capitalize">{occ}</span>
              </label>
            ))}
          </div>
        </fieldset>

       <Button
  type="submit"
  disabled={isSubmitting}
  className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
>
  {isSubmitting ? (
    <>
      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
      Saving...
    </>
  ) : (
    "Save"
  )}
</Button>

      </form>
    </main>
    </div>
  )
}
