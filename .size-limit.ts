import type { SizeLimitConfig } from 'size-limit';

module.exports = [
    {
        limit: '40 kB',
        path: ['dist/**/*.*'],
        brotli: true,
    },
] as SizeLimitConfig;
