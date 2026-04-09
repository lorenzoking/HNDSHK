# HNDSHK

Static landing site for [hndshk.io](https://hndshk.io), deployed with **GitHub Pages**.

## Enable GitHub Pages

1. Open **Settings → Pages** on [github.com/lorenzoking/HNDSHK](https://github.com/lorenzoking/HNDSHK).
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **`main`**, folder **`/ (root)`**, then **Save**.

The site will be available at `https://lorenzoking.github.io/HNDSHK/` until a custom domain is active.

## Custom domain (hndshk.io)

This repo includes a **`CNAME`** file set to `hndshk.io`.

1. In **Settings → Pages**, enter **Custom domain**: `hndshk.io` and save (GitHub may add a DNS check).
2. At your DNS host, add the records GitHub shows (typically **A** records to GitHub’s IPs for the apex, and/or **CNAME** for `www`).
3. After DNS propagates, enable **Enforce HTTPS** on the same Pages settings page.

## Local preview

```bash
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765`.

## Source logo files

Brand masters live in `Visuals/` locally; that folder is gitignored to keep the repo small. The live wordmark is `assets/hndshk-wordmark.png`.
