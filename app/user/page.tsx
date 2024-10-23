"use client"

import { test } from "./hooks"

export default function User() {

    const testResult = test()
    return (
        <div className="bg-slate-500 h-12">
            User
            {testResult}
        </div>
    )

}