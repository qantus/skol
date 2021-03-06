<?php

use Mindy\Router\Patterns;

return [
    '/user' => new Patterns('User.urls', 'user'),
    '/core' => new Patterns('Modules.Admin.urls', 'admin'),
    '/core/files' => new Patterns('Modules.Files.urls', 'files'),
    '/core/translate' => new Patterns('Modules.Translate.urls', 'translate'),
    '/core/engine' => new Patterns('Modules.Core.urls', 'core'),
    '/mail' => new Patterns('Modules.Mail.urls', 'mail'),
    '/skol' => new Patterns('Modules.Skol.urls', 'skol'),
    '/catalog' => new Patterns('Modules.Skol.catalog', 'catalog'),
    '' => new Patterns('Modules.Sitemap.urls', 'sitemap'),
    '/robots.txt' => new Patterns('Modules.Sites.urls', 'sites'),
    '/' => new Patterns('Modules.Pages.urls', 'page'),
];
