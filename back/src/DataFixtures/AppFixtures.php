<?php

namespace App\DataFixtures;

use App\Entity\Post;
use Doctrine\Bundle\FixturesBundle\Fixture;
//use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        for ($i = 0; $i < 6; $i++) {
            $post = new Post();
            $post->setTitle('Title '.$i);
            $post->setDescription(" Description jkj ji ZZ ".$i);
            $manager->persist($post);
        }

        $manager->flush();
    }
}
