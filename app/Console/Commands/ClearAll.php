<?php
/**
 * Created by PhpStorm.
 * User: Simone.Sacchi
 * Date: 2/12/2018
 * Time: 12:34 PM
 */


namespace App\Console\Commands;

use Illuminate\Console\Command;


class ClearAll extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'clear-all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear all cached resources.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {

        exec("composer dump-autoload");

        $this->call('cache:clear');
        $this->call('route:clear');
        $this->call('config:clear');
        $this->call('view:clear');
        $this->call('clear-compiled');
    }
}
