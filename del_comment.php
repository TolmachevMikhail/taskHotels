<?php
function delete_comment($id_to_del){
    global $children,$deleted;
    $sql = "DELETE FROM comment WHERE comment_id = $id_to_del";
    if(array_key_exists($id_to_del,$children)){
        foreach($children[$id_to_del] as $child) {
            delete_comment($child["comment_id"]);
        }
        dbQuery($sql);
        $deleted[]=$id_to_del;
    }
    else {
        dbQuery($sql);
        $deleted[]=$id_to_del;
    }
}

if(isset($_POST["delete"]) && strlen($_POST["delete"])>0 && is_numeric($_POST["delete"])) {
    require("comments.php");
    $del_id = $_POST['delete'];
    foreach ($items as $comment)
        $children[$comment['parent_id']][] = $comment;
    global $chidlren , $deleted;
    delete_comment($del_id);
    echo json_encode($deleted);


}else
    echo '<div class="error">Please enter required fields</div>';

/*
 * End of add_comment.php
 */