import { NumericFormat } from "react-number-format";
import PropTypes from 'prop-types';
import { forwardRef } from "react";
import { IMaskInput } from 'react-imask';

const slugify = (str) => {
    return String(str)
        .normalize('NFKD') // split accented characters into their base characters and diacritical marks
        .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
        .trim() // trim leading or trailing whitespace
        .toLowerCase() // convert to lowercase
        .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
}

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
    props,
    ref,
  ) {
    const { onChange, ...other } = props;
  
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator={"."}
        decimalSeparator={","}
        valueIsNumericString
      />
    );
});
NumericFormatCustom.propTypeses = {
name: PropTypes.string.isRequired,
onChange: PropTypes.func.isRequired,
};

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0000.000.000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        valueIsNumericString
        overwrite
      />
    );
  });
  TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

const TreeCategory = (category, idCategory) => {
    var out = []
    for (var i in category) {

        if (category[i].rootCategory == idCategory) {

            var children = TreeCategory(category, category[i].idCategory)
            if (children.length) {
                category[i].childCategory = children
            }
            else {
                category[i].childCategory=[]
            }
            category[i].key = category[i].idCategory
            out.push(category[i])
        }
    }
    return out
}

const ProductCategory = (category,product) => {
    var out = []
    for (var i in product) {
        product[i].listCategory = getCategoryByProduct(category, product[i].idCategory)
        out.push(product[i])
    }

    return out
}

const getCategoryByProduct = (dataCategory, idCate) => {
    var path=["all"];
    dataCategory.some(({ idCategory, childCategory }) => {
        var temp;
        if (idCategory === idCate) {
            path = [...path, idCategory];
            return true;    
        }
        if (temp = getCategoryByProduct(childCategory, idCate)) {
            path = [idCategory, ...temp];
            return true;
        }
    });
    return path;
}

//https://stackoverflow.com/questions/53175946/how-to-find-a-tree-inside-a-tree-in-typescript


export { slugify, TreeCategory,getCategoryByProduct, ProductCategory, NumericFormatCustom, TextMaskCustom }
