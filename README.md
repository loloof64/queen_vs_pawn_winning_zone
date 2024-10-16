# Queen vs Pawn winning zone

Find the winning zone for the king in the Queen vs Pawn chess endgame.

## For developers

### Install prerequesites

1. See [Tauri documentation](https://tauri.app/start/prerequisites/#system-dependencies) for system dependencies
2. Install Rustup
3. Install Nodejs or equivalent javascript runtime (Bun/Deno)
4. Run `npm install` or the equivalent command for your Javascript runtime.


### Nvidia cards on Linux

You may want to set the following env variable before running :

```bash
export WEBKIT_DISABLE_DMABUF_RENDERER=1
```

### Running on desktop

```bash
npm run tauri dev
```