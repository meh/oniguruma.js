#! /bin/sh

API+="["
API+="'onig_init','onig_end','onig_version',"
API+="'onig_error_code_to_str','onig_set_warn_func','onig_set_verb_warn_func',"
API+="'onig_new','onig_new_without_alloc','onig_new_deluxe',"
API+="'onig_free','onig_free_body',"
API+="'onig_search','onig_match',"
API+="'onig_region_new','onig_region_free','onig_region_copy','onig_region_clear','onig_region_resize',"
API+="'onig_name_to_group_numbers','onig_name_to_backref_number',"
API+="'onig_foreach_name',"
API+="'onig_number_of_names','onig_number_of_captures','onig_number_of_capture_histories',"
API+="'onig_get_encoding','onig_get_options','onig_get_case_fold_flag','onig_get_syntax',"
API+="'onig_get_capture_tree','onig_capture_tree_traverse','onig_noname_group_capture_is_active',"
API+="'onigenc_get_prev_char_head','onigenc_get_left_adjust_char_head','onigenc_get_right_adjust_char_head',"
API+="'onigenc_strlen','onigenc_strlen_null','onigenc_str_bytelen_null',"
API+="'onig_set_default_syntax','onig_copy_syntax',"
API+="'onig_get_syntax_op','onig_get_syntax_op2','onig_get_syntax_behavior','onig_get_syntax_options',"
API+="'onig_set_syntax_op','onig_set_syntax_op2','onig_set_syntax_behavior','onig_set_syntax_options',"
API+="'onig_copy_encoding',"
API+="'onig_set_meta_char',"
API+="'onig_get_default_case_fold_flags','onig_set_default_case_fold_flags',"
API+="'onig_get_match_stack_limit_size','onig_set_match_stach_limit_size'"
API+="]"

cd oniguruma
emconfigure ./configure || exit 1
make || exit 1
cd .libs

emcc --pre-js ../../pre.js -s EXPORTED_FUNCTIONS=$API libonig.so -o ../../libonig.js || exit 1
emcc --pre-js ../../pre.js -s EXPORTED_FUNCTIONS=$API -O2 libonig.so -o ../../libonig.O2.js || exit 1
emcc --pre-js ../../pre.js -s EXPORTED_FUNCTIONS=$API -O3 libonig.so -o ../../libonig.O3.js || exit 1
