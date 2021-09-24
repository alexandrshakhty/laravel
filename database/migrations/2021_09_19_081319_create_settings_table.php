<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->increments('id');
			$table->string('title');
			$table->string('description');
			$table->string('domain');
            $table->string('resourcename');            
            $table->string('logo');            
			$table->text('content'); 
            $table->text('contacts');
            $table->text('footer');            
            $table->string('advantage1');
            $table->string('advantage2');            
            $table->string('advantage3');            
            $table->string('advantage4');			
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
