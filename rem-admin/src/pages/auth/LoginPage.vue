<template>
  <div class="min-h-screen flex items-center justify-center bg-surface">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6">
        Login
      </h1>

      <form class="space-y-4">
        <input
          type="email"
          placeholder="Email"
          class="w-full border border-border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          class="w-full border border-border p-3 rounded-lg"
        />

        <button
          class="w-full bg-primary text-white p-3 rounded-lg"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>