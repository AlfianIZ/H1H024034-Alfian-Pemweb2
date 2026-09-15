<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class BadgeSks extends Component
{
    public function __construct(public int $sks)
    {
    }

    public function badgeClass(): string
    {
        return $this->sks < 3 ? 'bg-warning text-dark' : 'bg-primary';
    }

    public function render(): View|Closure|string
    {
        return view('components.badge-sks');
    }
}
