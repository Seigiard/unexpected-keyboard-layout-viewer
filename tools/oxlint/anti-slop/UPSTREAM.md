# Upstream source

- Repository: https://github.com/dmmulroy/anti-slop
- Commit: `c44ef22ca116d0ba62a3ff663a0bd13a3f3fa40b`
- Source: `skills/install-anti-slop/assets/anti-slop/`, verified identical to production `src/` by `node scripts/sync-skill-assets.mjs --check`.
- Installed path: `tools/oxlint/anti-slop/`.
- Rule source is unchanged. Upstream test files are not part of the distribution.
- Added this record, the upstream root MIT license, and a private ESM package boundary for the plugin. Application module settings are unchanged.
- Oxlint and `@oxlint/plugins`: exactly `1.87.0`.
- All 18 generic rules and native `oxc/no-accumulating-spread` are errors. Effect rules are not registered because Effect is not a direct dependency.
- The dedicated configuration disables Oxlint's default correctness category so this check adds the requested policy without replacing other checks.
