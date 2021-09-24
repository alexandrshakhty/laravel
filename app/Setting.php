<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = ['title','description','domain','resourcename','logo','content','contacts','footer','advantage1','advantage2','advantage3','advantage4'];
}
