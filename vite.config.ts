import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/jhh-card-game/' // ← リポジトリ名に合わせる
})
